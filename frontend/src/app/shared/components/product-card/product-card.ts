import { Component, computed, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProductWithHelpers } from '../../../core/models/product.model';
import { CurrencyService } from '../../../core/services/currency.service';
import { ProductService } from '../../../core/services/product.service';
import { getImageUrl, getCategoryIcon, ICONS } from '../../../core/constants/visuals';
import { TranslationService } from '../../../core/services/translation.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [TranslateModule, RouterLink],
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

  // Expose ICONS to template
  protected readonly icons = ICONS;

  quantity = signal(1);

  private currencyService = inject(CurrencyService);
  private productService = inject(ProductService);
  private translationService = inject(TranslationService);
  private router = inject(Router);
  private currentLang = toSignal(this.translationService.currentLang$, {
    initialValue: this.translationService.getCurrentLanguage(),
  });

  get has_discount(): boolean {
    return this.product.has_discount;
  }

  get formattedPrice(): string {
    return this.currencyService.formatPrice(this.currencyService.getBasePrice(this.product));
  }

  get formattedDiscountedPrice(): string {
    return this.currencyService.formatPrice(this.currencyService.getDiscountedPrice(this.product));
  }

  get canAddToCart(): boolean {
    return (
      this.product.in_stock &&
      !this.product.requires_prescription &&
      this.quantity() <= this.product.stock_quantity
    );
  }

  get hasRating(): boolean {
    return this.product.rating_number > 0;
  }

  localizedName = computed(() => {
    const lang = this.currentLang();
    if (lang === 'hu') return this.product.name_hu || this.product.name;
    if (lang === 'de') return this.product.name_de || this.product.name;
    return this.product.name_en || this.product.name;
  });

  localizedDescription = computed(() => {
    const lang = this.currentLang();
    if (lang === 'hu') return this.product.description_hu || this.product.description;
    if (lang === 'de') return this.product.description_de || this.product.description;
    return this.product.description_en || this.product.description;
  });

  get categoryName(): string {
    const cat = this.productService.getCategoryById(this.product.category);
    const lang = this.currentLang();
    if (!cat) return '';
    return lang === 'hu' ? cat.name_hu : lang === 'de' ? cat.name_de : cat.name_en;
  }

  getRatingStars(): string {
    const rating = this.product.rating_number;
    if (!rating) return '';
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return '★'.repeat(full) + (half ? '⯨' : '') + '☆'.repeat(empty);
  }

  increaseQuantity(): void {
    if (this.quantity() < this.product.stock_quantity) {
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
    this.addToCart.emit({ product: this.product, quantity: this.quantity() });
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.product);
    this.router.navigate(['/products', this.product.id]);
  }
}
