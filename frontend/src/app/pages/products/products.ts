import { Component, inject } from '@angular/core';
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
  private themeService = inject(ThemeService);

  ngOnInit(): void {
    this.themeService.setTheme('light');
  }
}
