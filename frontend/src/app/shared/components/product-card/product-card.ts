import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProductWithHelpers } from '../../../core/models/product.model';
import { CurrencyService } from '../../../core/services/currency.service';
import { getImageUrl, getCategoryIcon } from '../../../core/constants/visuals';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input({ required: true }) product!: ProductWithHelpers;
  @Input() compact = false;
  @Output() addToCart = new EventEmitter<ProductWithHelpers>();
  @Output() viewDetails = new EventEmitter<ProductWithHelpers>();
  @Output() quantityChange = new EventEmitter<{ product: ProductWithHelpers; quantity: number }>();

  // Helpers
  getImageUrl = getImageUrl;
  getCategoryIcon = getCategoryIcon;

  quantity = signal(1);

  private currencyService = inject(CurrencyService);

  get hasDiscount(): boolean {
    return this.product.hasDiscount;
  }

  get discountedPrice(): number {
    return this.product.price;
  }

  get formattedPrice(): string {
    return this.currencyService.formatPrice(this.product.priceNumber);
  }

  get formattedDiscountedPrice(): string {
    return this.currencyService.formatPrice(this.product.price);
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

  onAddToCart(): void {
    if (this.canAddToCart) {
      this.addToCart.emit(this.product);
    }
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.product);
  }
}
