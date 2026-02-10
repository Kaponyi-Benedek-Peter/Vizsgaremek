import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  signal,
  computed,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Product } from '../../../core/models/product.model';
import { CurrencyService } from '../../../core/services/currency.service';

@Component({
  selector: 'app-product-detail-modal',
  imports: [CommonModule, TranslateModule],
  templateUrl: './product-detail-modal.html',
  styleUrl: './product-detail-modal.css',
})
export class ProductDetailModal {
  @Input({ required: true }) product!: Product;
  @Output() close = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<{ product: Product; quantity: number }>();

  private translate = inject(TranslateService);
  private currencyService = inject(CurrencyService);

  quantity = signal(1);
  selectedImageIndex = signal(0);

  get images(): string[] {
    return this.product.images && this.product.images.length > 0
      ? this.product.images
      : [this.product.imageUrl];
  }

  get selectedImage(): string {
    return this.images[this.selectedImageIndex()];
  }

  canGoPrevious = computed(() => this.selectedImageIndex() > 0);
  canGoNext = computed(() => this.selectedImageIndex() < this.images.length - 1);

  get hasDiscount(): boolean {
    return !!this.product.discountPercentage && this.product.discountPercentage > 0;
  }

  get discountedPrice(): number {
    if (!this.hasDiscount) return this.product.price;
    return this.product.price * (1 - this.product.discountPercentage! / 100);
  }

  get formattedPrice(): string {
    return this.currencyService.formatPrice(this.product.price);
  }

  get formattedDiscountedPrice(): string {
    return this.currencyService.formatPrice(this.discountedPrice);
  }

  get totalPrice(): number {
    return this.discountedPrice * this.quantity();
  }

  get formattedTotalPrice(): string {
    return this.currencyService.formatPrice(this.totalPrice);
  }

  get canAddToCart(): boolean {
    return (
      this.product.inStock &&
      !this.product.requiresPrescription &&
      this.quantity() <= this.product.stockQuantity
    );
  }

  get localizedName(): string {
    const lang = this.translate.currentLang;
    switch (lang) {
      case 'hu':
        return this.product.nameHu || this.product.name;
      case 'en':
        return this.product.nameEn || this.product.name;
      case 'de':
        return this.product.nameDe || this.product.name;
      default:
        return this.product.name;
    }
  }

  get localizedDescription(): string {
    const lang = this.translate.currentLang;
    switch (lang) {
      case 'hu':
        return this.product.descriptionHu || this.product.description;
      case 'en':
        return this.product.descriptionEn || this.product.description;
      case 'de':
        return this.product.descriptionDe || this.product.description;
      default:
        return this.product.description;
    }
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
    if (!this.product.rating) return '';

    const fullStars = Math.floor(this.product.rating);
    const hasHalfStar = this.product.rating % 1 >= 0.5;
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

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.handleClose();
  }

  @HostListener('document:keydown.arrowleft')
  onArrowLeft(): void {
    this.previousImage();
  }

  @HostListener('document:keydown.arrowright')
  onArrowRight(): void {
    this.nextImage();
  }
}
