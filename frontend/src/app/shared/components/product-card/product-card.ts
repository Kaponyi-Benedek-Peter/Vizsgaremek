import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Product } from '../../../core/models/product.model';
import { CurrencyService } from '../../../core/services/currency.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input({ required: true }) product!: Product;
  @Input() compact = false;
  @Output() addToCart = new EventEmitter<Product>();
  @Output() viewDetails = new EventEmitter<Product>();
  @Output() quantityChange = new EventEmitter<{ product: Product; quantity: number }>();

  quantity = signal(1);

  private translate = inject(TranslateService);
  private currencyService = inject(CurrencyService);

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

  increaseQuantity(): void {
    if (this.quantity() < this.product.stockQuantity) {
      this.quantity.update((q) => q + 1);
      this.quantityChange.emit({ product: this.product, quantity: this.quantity() });
    }
  }

  decreaseQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.update((q) => q - 1);
      this.quantityChange.emit({ product: this.product, quantity: this.quantity() });
    }
  }

  handleAddToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.canAddToCart) {
      this.addToCart.emit(this.product);
    }
  }

  handleViewDetails(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.viewDetails.emit(this.product);
  }
}
