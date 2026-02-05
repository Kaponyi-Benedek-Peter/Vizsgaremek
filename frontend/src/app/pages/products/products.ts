import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../core/services/theme.service';
import { ProductList } from '../../shared/components/product-list/product-list';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductList],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  private translate = inject(TranslateService);
  private themeService = inject(ThemeService);

  ngOnInit(): void {
    this.translate.use('hu');

    this.themeService.setTheme('light');
  }
}
