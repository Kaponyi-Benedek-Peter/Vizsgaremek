import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationConfig } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-pagination',
  imports: [TranslateModule],
  templateUrl: './product-pagination.html',
  styleUrl: './product-pagination.css',
})
export class ProductPagination {
  @Input({ required: true }) pagination!: PaginationConfig;
  @Output() pageChange = new EventEmitter<number>();
  @Output() items_per_pageChange = new EventEmitter<number>();

  items_per_pageOptions = [10, 30, 60];

  get pages(): number[] {
    return this.getPageNumbers();
  }

  get hasPrevious(): boolean {
    return this.pagination.current_page > 1;
  }

  get hasNext(): boolean {
    return this.pagination.current_page < this.pagination.total_pages;
  }

  get startItem(): number {
    return (this.pagination.current_page - 1) * this.pagination.items_per_page + 1;
  }

  get endItem(): number {
    return Math.min(
      this.pagination.current_page * this.pagination.items_per_page,
      this.pagination.total_items,
    );
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.pagination.total_pages && page !== this.pagination.current_page) {
      this.pageChange.emit(page);
    }
  }

  previousPage(): void {
    if (this.hasPrevious) {
      this.goToPage(this.pagination.current_page - 1);
    }
  }

  nextPage(): void {
    if (this.hasNext) {
      this.goToPage(this.pagination.current_page + 1);
    }
  }

  updateItemsPerPage(count: number): void {
    this.items_per_pageChange.emit(count);
  }

  private getPageNumbers(): number[] {
    const current = this.pagination.current_page;
    const total = this.pagination.total_pages;
    const delta = 2;

    const pages: number[] = [];
    const rangeStart = Math.max(2, current - delta);
    const rangeEnd = Math.min(total - 1, current + delta);

    pages.push(1);

    if (rangeStart > 2) {
      pages.push(-1);
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < total - 1) {
      pages.push(-1);
    }

    if (total > 1) {
      pages.push(total);
    }

    return pages;
  }
}
