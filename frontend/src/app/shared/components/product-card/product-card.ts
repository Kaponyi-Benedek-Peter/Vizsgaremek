import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductWithHelpers } from '../../../core/models/product.model';
import { CurrencyService } from '../../../core/services/currency.service';
import { ProductService } from '../../../services/product.service';
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
  @Output() addToCart = new EventEmitter<{ product: ProductWithHelpers; quantity: number }>();
  @Output() viewDetails = new EventEmitter<ProductWithHelpers>();
  @Output() quantityChange = new EventEmitter<{ product: ProductWithHelpers; quantity: number }>();

  getImageUrl = getImageUrl;
  getCategoryIcon = getCategoryIcon;

  quantity = signal(1);

  private currencyService = inject(CurrencyService);
  private productService = inject(ProductService);
  private translateService = inject(TranslateService);

  get hasDiscount(): boolean {
    return this.product.hasDiscount;
  }

  get formattedPrice(): string {
    // getBasePrice reads the currentCurrency signal → converts HUF→USD/EUR as needed
    return this.currencyService.formatPrice(this.currencyService.getBasePrice(this.product));
  }

  get formattedDiscountedPrice(): string {
    // getDiscountedPrice applies sale_percentage on top of the converted base price
    return this.currencyService.formatPrice(this.currencyService.getDiscountedPrice(this.product));
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
    const catId = this.product.category ?? this.product.category_id ?? '';
    const cat = this.productService.getCategoryById(catId);
    if (!cat) return '';
    const lang = this.translateService.currentLang || 'hu';
    return lang === 'hu' ? cat.name_hu : lang === 'de' ? cat.name_de : cat.name_en;
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
      // only event emit — the parent (product-list) manages the addtocart.
      this.addToCart.emit({ product: this.product, quantity: this.quantity() });
      this.quantity.set(1);
    }
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.product);
  }
}
