import { Component, signal, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { Toast } from './shared/components/toast/toast';
import { TranslationService } from './core/services/translation.service';
import { ImageCacheService } from './core/services/image-cache.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');

  private imageCacheService = inject(ImageCacheService);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translationService: TranslationService,
  ) {}

  ngOnInit(): void {
    const chpass = new URLSearchParams(window.location.search).get('chpass');
    if (chpass) {
      this.router.navigate(['/password-reset'], {
        queryParams: { chpass },
        replaceUrl: true,
      });
    }

    this.imageCacheService.preloadCriticalImages();
  }
}
