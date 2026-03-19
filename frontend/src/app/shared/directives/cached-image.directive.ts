import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ImageCacheService } from '../../core/services/image-cache.service';

@Directive({
  selector: 'img[appCachedImg]',
  standalone: true,
})
export class CachedImgDirective implements OnChanges, OnDestroy {
  @Input('appCachedImg') src: string = '';

  private cacheService = inject(ImageCacheService);
  private el = inject(ElementRef);
  private currentBlobUrl: string | null = null;
  private aborted = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src']) {
      this.loadImage(this.src);
    }
  }

  ngOnDestroy(): void {
    this.aborted = true;
    this.revokeCurrent();
  }

  private async loadImage(src: string): Promise<void> {
    if (!src) return;

    this.revokeCurrent();
    this.aborted = false;

    const img = this.el.nativeElement as HTMLImageElement;

    img.src = src;

    try {
      const cachedUrl = await this.cacheService.getCachedUrl(src);
      if (this.aborted || this.src !== src) return;

      if (cachedUrl !== src) {
        this.currentBlobUrl = cachedUrl;
        img.src = cachedUrl;
      }
    } catch {}
  }

  private revokeCurrent(): void {
    if (this.currentBlobUrl) {
      URL.revokeObjectURL(this.currentBlobUrl);
      this.currentBlobUrl = null;
    }
  }
}
