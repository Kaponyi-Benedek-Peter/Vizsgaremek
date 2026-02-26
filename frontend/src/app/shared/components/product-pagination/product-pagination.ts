import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationConfig } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-pagination',
  imports: [CommonModule, TranslateModule],
  templateUrl: './product-pagination.html',
  styleUrl: './product-pagination.css',
})
export class ProductPagination {
  @Input({ required: true }) pagination!: PaginationConfig;
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  itemsPerPageOptions = [10, 30, 60];

  get pages(): number[] {
    return this.getPageNumbers();
  }

  get hasPrevious(): boolean {
    return this.pagination.currentPage > 1;
  }

  get hasNext(): boolean {
    return this.pagination.currentPage < this.pagination.totalPages;
  }

  get startItem(): number {
    return (this.pagination.currentPage - 1) * this.pagination.itemsPerPage + 1;
  }

  get endItem(): number {
    return Math.min(
      this.pagination.currentPage * this.pagination.itemsPerPage,
      this.pagination.totalItems,
    );
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.pagination.totalPages && page !== this.pagination.currentPage) {
      this.pageChange.emit(page);
    }
  }

  previousPage(): void {
    if (this.hasPrevious) {
      this.goToPage(this.pagination.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.hasNext) {
      this.goToPage(this.pagination.currentPage + 1);
    }
  }

  updateItemsPerPage(count: number): void {
    this.itemsPerPageChange.emit(count);
  }

  private getPageNumbers(): number[] {
    const current = this.pagination.currentPage;
    const total = this.pagination.totalPages;
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
