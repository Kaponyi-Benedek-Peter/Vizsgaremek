import { Injectable, inject, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslationService, SupportedLanguage } from './translation.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';

export interface CurrencyConfig {
  code: string;
  symbol: string;
  locale: string;
}

export interface HasPriceFields {
  price_huf: string;
  price_usd?: string;
  price_eur?: string;
  sale_percentage: string;
}

interface FrankfurterResponse {
  rates: Record<string, number>;
}

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private translationService = inject(TranslationService);
  private http = inject(HttpClient);

  private currentLang = toSignal(this.translationService.currentLang$, {
    initialValue: 'en' as SupportedLanguage,
  });

  // Fallback rates: 1 HUF in USD / EUR (approximate)
  private ratesSignal = signal<Record<string, number>>({
    USD: 0.0028,
    EUR: 0.0026,
  });

  private readonly currencyMap: Record<SupportedLanguage, CurrencyConfig> = {
    hu: { code: 'HUF', symbol: 'Ft', locale: 'hu-HU' },
    en: { code: 'USD', symbol: '$', locale: 'en-US' },
    de: { code: 'EUR', symbol: '€', locale: 'de-DE' },
  };

  currentCurrency = computed(() => this.currencyMap[this.currentLang()]);

  getBasePrice(product: HasPriceFields): number {
    const code = this.currentCurrency().code;
    const hufPrice = parseFloat(product.price_huf) || 0;

    switch (code) {
      case 'USD':
        return parseFloat(product.price_usd ?? '0') || hufPrice;
      case 'EUR':
        return parseFloat(product.price_eur ?? '0') || hufPrice;
      default:
        return hufPrice;
    }
  }

  getDiscountedPrice(product: HasPriceFields): number {
    const base = this.getBasePrice(product);
    const sale = parseFloat(product.sale_percentage) || 0;
    return sale > 0 ? Math.round(base * (1 - sale / 100) * 100) / 100 : base;
  }

  formatPrice(price: number): string {
    const currency = this.currentCurrency();
    const formatted = price.toLocaleString(currency.locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return currency.code === 'HUF'
      ? `${formatted} ${currency.symbol}`
      : `${currency.symbol}${formatted}`;
  }

  getCurrencyForLanguage(lang: SupportedLanguage): CurrencyConfig {
    return this.currencyMap[lang];
  }

  getCurrentCurrencyCode(): string {
    return this.currentCurrency().code;
  }

  getCurrentCurrencySymbol(): string {
    return this.currentCurrency().symbol;
  }
}
