import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject, computed } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CurrencyService } from '../../../core/services/currency.service';
import { ProductWithHelpers } from '../../../core/models/product.model';
import { CurrencyPipe } from '../../pipes/currency.pipe';
import { IMAGES } from '../../../core/constants/visuals';
import { TranslationService } from '../../../core/services/translation.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-featured-product-card',
  imports: [CommonModule, NgIf, TranslateModule, CurrencyPipe],
  templateUrl: './featured-product-card.html',
  styleUrl: './featured-product-card.css',
})
export class FeaturedProductCard {
  @Input() product!: ProductWithHelpers;
  @Output() cardClick = new EventEmitter<void>();

  private currencyService = inject(CurrencyService);
  private translationService = inject(TranslationService);
  private currentLang = toSignal(this.translationService.currentLang$, {
    initialValue: this.translationService.getCurrentLanguage(),
  });

  productName = computed(() => {
    const lang = this.currentLang();
    if (lang === 'hu') return this.product?.name_hu || this.product?.name || '';
    if (lang === 'de') return this.product?.name_de || this.product?.name || '';
    return this.product?.name_en || this.product?.name || '';
  });

  imageUrl = computed(() => {
    return this.product?.imageUrl || IMAGES.productDefault;
  });

  altText = computed(() => {
    const name = this.productName();
    return name || this.translationService.instant('product.product_image');
  });

  price = computed(() => this.currencyService.getDiscountedPrice(this.product));
  oldPrice = computed(() =>
    this.product?.hasDiscount ? this.currencyService.getBasePrice(this.product) : null,
  );

  inStock = computed(() => {
    return this.product?.inStock || false;
  });

  discountPercentage = computed(() => {
    return this.product?.discountPercentage || 0;
  });

  requiresPrescription = computed(() => {
    return this.product?.requiresPrescription || false;
  });

  onCardClick(): void {
    if (this.product) {
      this.cardClick.emit();
    }
  }
}
