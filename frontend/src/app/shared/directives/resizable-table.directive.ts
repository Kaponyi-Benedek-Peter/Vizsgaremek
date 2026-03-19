import { Directive, ElementRef, Input, AfterViewInit, OnDestroy, NgZone } from '@angular/core';

@Directive({
  selector: '[appResizableTable]',
  standalone: true,
})
export class ResizableTableDirective implements AfterViewInit, OnDestroy {
  @Input('appResizableTable') tableId = '';

  private table!: HTMLTableElement;
  private cleanupFns: (() => void)[] = [];
  private initTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly GRAB_ZONE = 8;
  private readonly MIN_COL_WIDTH = 60;
  private readonly STORAGE_PREFIX = 'roys_admin_col_widths_';

  constructor(
    private el: ElementRef<HTMLTableElement>,
    private zone: NgZone,
  ) {}

  ngAfterViewInit(): void {
    this.table = this.el.nativeElement;
    this.zone.runOutsideAngular(() => {
      this.initTimer = setTimeout(() => this.initColumns(), 50);
    });
  }

  ngOnDestroy(): void {
    if (this.initTimer !== null) clearTimeout(this.initTimer);
    this.cleanupFns.forEach((fn) => fn());
    this.cleanupFns = [];
  }

  private get storageKey(): string {
    return this.STORAGE_PREFIX + (this.tableId || 'default');
  }

  private saveWidths(): void {
    try {
      const widths = this.getHeaders().map((h) => h.getBoundingClientRect().width);
      localStorage.setItem(this.storageKey, JSON.stringify(widths));
    } catch {
      /* ignore */
    }
  }

  private loadWidths(): number[] | null {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? (JSON.parse(raw) as number[]) : null;
    } catch {
      return null;
    }
  }

  private getHeaders(): HTMLTableCellElement[] {
    return Array.from(this.table.querySelectorAll<HTMLTableCellElement>('thead th'));
  }

  private initColumns(): void {
    const headers = this.getHeaders();
    if (!headers.length) return;

    const saved = this.loadWidths();
    if (saved) {
      headers.forEach((th, i) => {
        if (saved[i]) th.style.minWidth = `${saved[i]}px`;
      });
    }

    headers.forEach((th) => {
      const onMouseMove = (e: MouseEvent) => {
        const rect = th.getBoundingClientRect();
        const nearRightEdge = e.clientX >= rect.right - this.GRAB_ZONE;
        th.style.cursor = nearRightEdge ? 'col-resize' : 'default';
      };

      const onMouseDown = (e: MouseEvent) => {
        const rect = th.getBoundingClientRect();
        if (e.clientX < rect.right - this.GRAB_ZONE) return;

        e.preventDefault();
        e.stopPropagation();

        const startX = e.clientX;
        const startWidth = rect.width;

        th.classList.add('is-resizing');
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';

        const onDragMove = (ev: MouseEvent) => {
          const newWidth = Math.max(this.MIN_COL_WIDTH, startWidth + (ev.clientX - startX));
          th.style.minWidth = `${newWidth}px`;
        };

        const onDragEnd = () => {
          document.removeEventListener('mousemove', onDragMove);
          document.removeEventListener('mouseup', onDragEnd);
          th.classList.remove('is-resizing');
          document.body.style.cursor = '';
          document.body.style.userSelect = '';
          this.saveWidths();
        };

        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('mouseup', onDragEnd);
      };

      th.addEventListener('mousemove', onMouseMove);
      th.addEventListener('mousedown', onMouseDown);

      this.cleanupFns.push(() => {
        th.removeEventListener('mousemove', onMouseMove);
        th.removeEventListener('mousedown', onMouseDown);
      });
    });
  }
}
