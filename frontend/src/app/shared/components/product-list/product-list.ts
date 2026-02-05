import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Product, Category, ProductFilterOptions } from '../../../core/models/product.model';
import { ProductService } from '../../../services/product.service';
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

  // Signal accessors from service
  products = this.productService.paginatedProducts;
  pagination = this.productService.paginationState;
  filters = this.productService.currentFilters;
  allProducts = this.productService.products;

  selectedProduct: Product | null = null;
  showModal = false;

  // Mock categories (replace with service call)
  categories: Category[] = [
    {
      id: 'medicine',
      slug: 'medicine',
      name: 'Gyógyszerek',
      nameHu: 'Gyógyszerek',
      nameEn: 'Medicines',
      nameDe: 'Medizin',
      icon: '💊',
    },
    {
      id: 'vitamins',
      slug: 'vitamins',
      name: 'Vitaminok',
      nameHu: 'Vitaminok',
      nameEn: 'Vitamins',
      nameDe: 'Vitamine',
      icon: '🍊',
    },
    {
      id: 'supplements',
      slug: 'supplements',
      name: 'Táplálékkiegészítők',
      nameHu: 'Táplálékkiegészítők',
      nameEn: 'Supplements',
      nameDe: 'Nahrungsergänzungen',
      icon: '💪',
    },
    {
      id: 'cosmetics',
      slug: 'cosmetics',
      name: 'Kozmetikumok',
      nameHu: 'Kozmetikumok',
      nameEn: 'Cosmetics',
      nameDe: 'Kosmetik',
      icon: '💄',
    },
    {
      id: 'baby-care',
      slug: 'baby-care',
      name: 'Babaápolás',
      nameHu: 'Babaápolás',
      nameEn: 'Baby Care',
      nameDe: 'Babypflege',
      icon: '👶',
    },
    {
      id: 'medical-devices',
      slug: 'medical-devices',
      name: 'Orvosi eszközök',
      nameHu: 'Orvosi eszközök',
      nameEn: 'Medical Devices',
      nameDe: 'Medizinische Geräte',
      icon: '🩺',
    },
  ];

  async ngOnInit(): Promise<void> {
    await this.productService.loadProducts();
  }

  handleCategorySelected(categoryId: string): void {
    const currentCategories = this.filters().categories;
    const updated = currentCategories.includes(categoryId)
      ? currentCategories.filter((c) => c !== categoryId)
      : [...currentCategories, categoryId];

    this.productService.setFilters({ categories: updated });
  }

  handleClearCategories(): void {
    this.productService.setFilters({ categories: [] });
  }

  handleFilterChanged(filters: ProductFilterOptions): void {
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

  handleAddToCart(product: Product): void {
    // TODO: Implement cart service
    console.log('Add to cart:', product);
  }

  handleViewDetails(product: Product): void {
    this.selectedProduct = product;
    this.showModal = true;
  }

  handleCloseModal(): void {
    this.showModal = false;
    this.selectedProduct = null;
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
