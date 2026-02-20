import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject, computed } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CurrencyService } from '../../../core/services/currency.service';
import { ProductWithHelpers } from '../../../core/models/product.model';
import { CurrencyPipe } from '../../pipes/currency.pipe';
import { IMAGES } from '../../../core/constants/visuals';

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
  private translateService = inject(TranslateService);

  productName = computed(() => {
    const lang = this.translateService.currentLang;
    if (lang === 'hu') return this.product?.name_hu || this.product?.name || '';
    if (lang === 'de') return this.product?.name_de || this.product?.name || '';
    return this.product?.name_en || this.product?.name || '';
  });

  imageUrl = computed(() => {
    return this.product?.imageUrl || IMAGES.productDefault;
  });

  altText = computed(() => {
    const name = this.productName();
    return name || this.translateService.instant('product.product_image');
  });

  price = computed(() => {
    return this.product?.price || 0;
  });

  oldPrice = computed(() => {
    if (!this.product?.hasDiscount) return null;
    return this.product.priceNumber || null;
  });

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
