import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-detail-modal',
  imports: [CommonModule, TranslateModule],
  templateUrl: './product-detail-modal.html',
  styleUrl: './product-detail-modal.css',
})
export class ProductDetailModal {
  @Input({ required: true }) product!: Product;
  @Output() close = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<Product>();

  private translate = inject(TranslateService);

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

  get hasDiscount(): boolean {
    return !!this.product.discountPercentage && this.product.discountPercentage > 0;
  }

  get discountedPrice(): number {
    if (!this.hasDiscount) return this.product.price;
    return this.product.price * (1 - this.product.discountPercentage! / 100);
  }

  get formattedPrice(): string {
    return `${this.product.price.toLocaleString('hu-HU')} Ft`;
  }

  get formattedDiscountedPrice(): string {
    return `${this.discountedPrice.toLocaleString('hu-HU')} Ft`;
  }

  get totalPrice(): number {
    return this.discountedPrice * this.quantity();
  }

  get formattedTotalPrice(): string {
    return `${this.totalPrice.toLocaleString('hu-HU')} Ft`;
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

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.handleClose();
  }

  selectImage(index: number): void {
    this.selectedImageIndex.set(index);
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
      this.addToCart.emit(this.product);
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
