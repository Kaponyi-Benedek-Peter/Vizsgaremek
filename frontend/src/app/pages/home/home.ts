import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { Slide } from '../../shared/components/slide/slide';
import { Featured } from '../../shared/components/featured/featured';
import { FeaturedProductCard } from '../../shared/components/featured-product-card/featured-product-card';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { IMAGES } from '../../core/constants/visuals';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    Slide,
    Featured,
    FeaturedProductCard,
    ScrollRevealDirective,
    TranslateModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  products = [
    { id: 1, img: '', alt: 'Termék 1' },
    { id: 2, img: '', alt: 'Termék 2' },
    { id: 3, img: '', alt: 'Termék 3' },
  ];

  onProductClick(productId: number): void {
    console.log(`Termék ${productId} kattintva`);
    // TODO: Navigate to product detail page
  }
}
