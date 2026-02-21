import { Pipe, PipeTransform, inject } from '@angular/core';
import { CurrencyService } from '../../core/services/currency.service';

@Pipe({
  name: 'appCurrency',
  standalone: true,
  pure: true,
})
export class CurrencyPipe implements PipeTransform {
  private currencyService = inject(CurrencyService);

  transform(value: number | null | undefined): string {
    if (value == null || isNaN(value)) {
      return '';
    }

    return this.currencyService.formatPrice(value);
  }
}
