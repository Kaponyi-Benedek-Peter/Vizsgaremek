import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Category, ProductWithHelpers } from '../../../core/models/product.model';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { CategoryBar } from '../category-bar/category-bar';
import { ProductCard } from '../product-card/product-card';
import { ProductFilter } from '../product-filter/product-filter';
import { ProductPagination } from '../product-pagination/product-pagination';
import { ProductDetailModal } from '../product-detail-modal/product-detail-modal';

@Component({
  selector: 'app-product-list',
  imports: [
    CommonModule,
    TranslateModule,
    CategoryBar,
    ProductFilter,
    ProductCard,
    ProductPagination,
    ProductDetailModal,
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  products = this.productService.paginatedProducts;
  pagination = this.productService.paginationState;
  filters = this.productService.currentFilters;
  allProducts = this.productService.products;

  categories = computed<Category[]>(() => this.productService.categories());

  selectedProduct: ProductWithHelpers | null = null;
  showModal = false;

  async ngOnInit(): Promise<void> {
    await Promise.all([this.productService.loadProducts(), this.productService.loadCategories()]);
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

  handleFilterChanged(filters: any): void {
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
    this.showModal = true;
  }

  handleModalClose(): void {
    this.showModal = false;
    this.selectedProduct = null;
  }

  handleModalAddToCart(event: { product: ProductWithHelpers; quantity: number }): void {
    this.cartService.addToCart(event.product, event.quantity);
    this.handleModalClose();
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
