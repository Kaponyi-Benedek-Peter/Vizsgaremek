import { Injectable, inject, computed } from '@angular/core';
import { TranslationService, SupportedLanguage } from './translation.service';
import { toSignal } from '@angular/core/rxjs-interop';

export interface CurrencyConfig {
  code: string;
  symbol: string;
  locale: string;
}

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private translationService = inject(TranslationService);

  private currentLang = toSignal(this.translationService.currentLang$, {
    initialValue: 'en' as SupportedLanguage,
  });

  private readonly currencyMap: Record<SupportedLanguage, CurrencyConfig> = {
    hu: { code: 'HUF', symbol: 'Ft', locale: 'hu-HU' },
    en: { code: 'USD', symbol: '$', locale: 'en-US' },
    de: { code: 'EUR', symbol: '€', locale: 'de-DE' },
  };

  currentCurrency = computed(() => {
    const lang = this.currentLang();
    return this.currencyMap[lang];
  });

  formatPrice(price: number): string {
    const currency = this.currentCurrency();

    const formatted = price.toLocaleString(currency.locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    if (currency.code === 'HUF') {
      return `${formatted} ${currency.symbol}`;
    } else {
      return `${currency.symbol}${formatted}`;
    }
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
