import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Category, ProductWithHelpers } from '../../../core/models/product.model';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { CategoryBar } from '../category-bar/category-bar';
import { ProductCard } from '../product-card/product-card';
import { ProductFilter } from '../product-filter/product-filter';
import { ProductPagination } from '../product-pagination/product-pagination';
import { ProductDetailModal } from '../product-detail-modal/product-detail-modal';
import { getCategoriesFromVisuals } from '../../../core/constants/visuals';

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

  selectedProduct: ProductWithHelpers | null = null;
  showModal = false;

  categories: Category[] = getCategoriesFromVisuals();

  async ngOnInit(): Promise<void> {
    await this.productService.loadProducts();
  }

  handleCategorySelected(categoryId: string): void {
    const currentCategories = this.filters().categories || [];
    const updated = currentCategories.includes(categoryId)
      ? currentCategories.filter((c) => c !== categoryId)
      : [...currentCategories, categoryId];

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

  handleAddToCart(product: ProductWithHelpers): void {
    this.cartService.addToCart(product, 1);
    console.log('Added to cart:', product.name);
  }

  handleAddToCartFromModal(event: { product: ProductWithHelpers; quantity: number }): void {
    this.cartService.addToCart(event.product, event.quantity);
    console.log(`Added ${event.quantity}x ${event.product.name} to cart`);
  }

  handleViewDetails(product: ProductWithHelpers): void {
    this.selectedProduct = product;
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  handleCloseModal(): void {
    this.showModal = false;
    this.selectedProduct = null;
    document.body.style.overflow = '';
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
