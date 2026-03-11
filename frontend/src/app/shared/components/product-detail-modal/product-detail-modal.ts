import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, signal, computed } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductWithHelpers } from '../../../core/models/product.model';
import { CurrencyService } from '../../../core/services/currency.service';
import { ProductService } from '../../../services/product.service';
import { ICONS } from '../../../core/constants/visuals';

@Component({
  selector: 'app-product-detail-modal',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './product-detail-modal.html',
  styleUrl: './product-detail-modal.css',
})
export class ProductDetailModal {
  @Input({ required: true }) product!: ProductWithHelpers;
  @Output() close = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<{ product: ProductWithHelpers; quantity: number }>();

  private currencyService = inject(CurrencyService);
  private productService = inject(ProductService);
  private translateService = inject(TranslateService);

  // Expose ICONS to the template
  protected readonly icons = ICONS;

  quantity = signal(1);
  selectedImageIndex = signal(0);

  get images(): string[] {
    return this.product.images;
  }

  get selectedImage(): string {
    return this.images[this.selectedImageIndex()];
  }

  canGoPrevious = computed(() => this.selectedImageIndex() > 0);
  canGoNext = computed(() => this.selectedImageIndex() < this.images.length - 1);

  get hasDiscount(): boolean {
    return this.product.hasDiscount;
  }

  get formattedPrice(): string {
    return this.currencyService.formatPrice(this.currencyService.getBasePrice(this.product));
  }

  get formattedDiscountedPrice(): string {
    return this.currencyService.formatPrice(this.currencyService.getDiscountedPrice(this.product));
  }

  get formattedTotalPrice(): string {
    const unitPrice = this.currencyService.getDiscountedPrice(this.product);
    return this.currencyService.formatPrice(unitPrice * this.quantity());
  }

  get canAddToCart(): boolean {
    return (
      this.product.inStock &&
      !this.product.requiresPrescription &&
      this.quantity() <= this.product.stockQuantity
    );
  }

  get localizedName(): string {
    return this.product.name;
  }

  get localizedDescription(): string {
    return this.product.description;
  }

  get categoryName(): string {
    const cat = this.productService.getCategoryById(this.product.category);
    const lang = this.translateService.currentLang;
    if (!cat) return '';
    return lang === 'hu' ? cat.name_hu : lang === 'de' ? cat.name_de : cat.name_en;
  }

  getRatingStars(): string {
    const rating = this.product.ratingNumber;
    if (!rating) return '';
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return '★'.repeat(full) + (half ? '⯨' : '') + '☆'.repeat(empty);
  }

  selectImage(index: number): void {
    this.selectedImageIndex.set(index);
  }

  nextImage(): void {
    if (this.canGoNext()) {
      this.selectedImageIndex.update((i) => i + 1);
    }
  }

  previousImage(): void {
    if (this.canGoPrevious()) {
      this.selectedImageIndex.update((i) => i - 1);
    }
  }

  increaseQuantity(): void {
    if (this.quantity() < this.product.stockQuantity) {
      this.quantity.update((q) => q + 1);
    }
  }

  decreaseQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.update((q) => q - 1);
    }
  }

  handleAddToCart(): void {
    if (this.canAddToCart) {
      this.addToCart.emit({ product: this.product, quantity: this.quantity() });
    }
  }

  handleClose(): void {
    this.close.emit();
  }

  handleBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }
}
