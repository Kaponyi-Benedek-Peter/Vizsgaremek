import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProductWithHelpers } from '../../../core/models/product.model';
import { CurrencyService } from '../../../core/services/currency.service';
import { ProductService } from '../../../services/product.service';
import { getImageUrl, getCategoryIcon } from '../../../core/constants/visuals';
import { TranslationService } from '../../../core/services/translation.service';
import { toSignal } from '@angular/core/rxjs-interop';

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
  private translationService = inject(TranslationService);
  private currentLang = toSignal(this.translationService.currentLang$, {
    initialValue: this.translationService.getCurrentLanguage(),
  });

  get hasDiscount(): boolean {
    return this.product.hasDiscount;
  }

  get formattedPrice(): string {
    return this.currencyService.formatPrice(this.currencyService.getBasePrice(this.product));
  }

  get formattedDiscountedPrice(): string {
    return this.currencyService.formatPrice(this.currencyService.getDiscountedPrice(this.product));
  }

  get canAddToCart(): boolean {
    return (
      this.product.inStock &&
      !this.product.requiresPrescription &&
      this.quantity() <= this.product.stockQuantity
    );
  }

  get hasRating(): boolean {
    return this.product.ratingNumber > 0;
  }

  getRatingStars(): string {
    const rating = this.product.ratingNumber;
    if (!rating) return '';
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return '★'.repeat(full) + (half ? '⯨' : '') + '☆'.repeat(empty);
  }

  localizedName = computed(() => {
    const lang = this.currentLang();
    if (lang === 'hu') return this.product?.name_hu || this.product?.name || '';
    if (lang === 'de') return this.product?.name_de || this.product?.name || '';
    return this.product?.name_en || this.product?.name || '';
  });

  localizedDescription = computed(() => {
    const lang = this.currentLang();
    if (lang === 'hu') return this.product?.description_hu || '';
    if (lang === 'de') return this.product?.description_de || '';
    return this.product?.description_en || '';
  });

  get categoryName(): string {
    const catId = this.product.category ?? this.product.category_id ?? '';
    const cat = this.productService.getCategoryById(catId);
    if (!cat) return '';
    const lang = this.currentLang();
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
      this.addToCart.emit({ product: this.product, quantity: this.quantity() });
      this.quantity.set(1);
    }
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.product);
  }
}
