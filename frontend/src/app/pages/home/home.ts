import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { Slide } from '../../shared/components/slide/slide';
import { Featured } from '../../shared/components/featured/featured';
import { FeaturedProductCard } from '../../shared/components/featured-product-card/featured-product-card';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { ICONS, IMAGES } from '../../core/constants/visuals';

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
  IMAGES = IMAGES;
  ICONS = ICONS;

  products = [
    { id: 1, img: IMAGES.hero1, alt: 'Termék 1' },
    { id: 2, img: IMAGES.hero2, alt: 'Termék 2' },
    { id: 3, img: IMAGES.hero3, alt: 'Termék 3' },
    { id: 4, img: IMAGES.hero4, alt: 'Termék 4' },
  ];

  onProductClick(productId: number): void {
    console.log(`Termék ${productId} kattintva`);
  }
}
