import { Component, computed, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { interval } from 'rxjs';
import {
  Category,
  ProductWithHelpers,
  ProductFilterOptions,
} from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { CategoryBar } from '../category-bar/category-bar';
import { ProductCard } from '../product-card/product-card';
import { ProductFilter } from '../product-filter/product-filter';
import { ProductPagination } from '../product-pagination/product-pagination';
import { ICONS } from '../../../core/constants/visuals';

import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

const POLL_INTERVAL_MS = 60_000;

@Component({
  selector: 'app-product-list',
  imports: [
    TranslateModule,
    CategoryBar,
    ProductFilter,
    ProductCard,
    ProductPagination,
    ScrollRevealDirective,
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private destroyRef = inject(DestroyRef);

  protected readonly icons = ICONS;

  products = this.productService.paginatedProducts;
  isLoading = this.productService.isLoading;
  pagination = this.productService.paginationState;
  filters = this.productService.currentFilters;
  allProducts = this.productService.products;

  categories = computed<Category[]>(() => this.productService.categories());

  selectedProduct: ProductWithHelpers | null = null;

  async ngOnInit(): Promise<void> {
    await Promise.all([this.productService.loadProducts(), this.productService.loadCategories()]);
    this.startPolling();
  }

  private startPolling(): void {
    interval(POLL_INTERVAL_MS)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.productService.loadProducts();
      });
  }

  handleCategorySelected(categoryId: string): void {
    const current = this.filters().categories || [];
    const updated = current.includes(categoryId)
      ? current.filter((c) => c !== categoryId)
      : [...current, categoryId];
    this.productService.setFilters({ categories: updated });
  }

  handleClearCategories(): void {
    this.productService.setFilters({ categories: [] });
  }

  handleFilterChanged(filters: Partial<ProductFilterOptions>): void {
    this.productService.setFilters(filters);
  }

  handleClearFilters(): void {
    this.productService.clearFilters();
  }

  handlePageChange(page: number): void {
    this.productService.setPage(page);
    this.scrollToTop();
  }

  handleItemsPerPageChange(count: number): void {
    this.productService.setItemsPerPage(count);
    this.scrollToTop();
  }

  handleAddToCart(event: { product: ProductWithHelpers; quantity: number }): void {
    this.cartService.addToCart(event.product, event.quantity);
  }

  handleViewDetails(product: ProductWithHelpers): void {
    this.selectedProduct = product;
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
