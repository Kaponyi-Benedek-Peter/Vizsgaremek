import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, signal, computed } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductWithHelpers } from '../../../core/models/product.model';
import { CurrencyService } from '../../../core/services/currency.service';
import { ProductService } from '../../../services/product.service';

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
    // getBasePrice convert HUF → actual devisa (USD/EUR/HUF)
    // product.priceNumber and product.price always HUF!
    return this.currencyService.formatPrice(this.currencyService.getBasePrice(this.product));
  }

  get formattedDiscountedPrice(): string {
    // getDiscountedPrice = getBasePrice + sale_percentage levonása
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
    const cat = this.productService.getCategoryById(this.product.category ?? '');
    const lang = this.translateService.currentLang || 'hu';
    if (!cat) return '';
    return lang === 'hu' ? cat.name_hu : lang === 'de' ? cat.name_de : cat.name_en;
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

  getRatingStars(): string {
    if (!this.product.ratingNumber) return '';
    const fullStars = Math.floor(this.product.ratingNumber);
    const hasHalfStar = this.product.ratingNumber % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    return '★'.repeat(fullStars) + (hasHalfStar ? '⯨' : '') + '☆'.repeat(emptyStars);
  }

  handleAddToCart(): void {
    if (this.canAddToCart) {
      this.addToCart.emit({ product: this.product, quantity: this.quantity() });
      this.handleClose();
    }
  }

  handleClose(): void {
    this.close.emit();
  }

  handleBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.handleClose();
    }
  }
}
