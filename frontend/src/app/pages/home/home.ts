import { Component, inject, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { Slide } from '../../shared/components/slide/slide';
import { Featured } from '../../shared/components/featured/featured';
import { FeaturedProductCard } from '../../shared/components/featured-product-card/featured-product-card';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { ICONS, IMAGES } from '../../core/constants/visuals';
import { ProductService } from '../../services/product.service';

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
export class Home implements OnInit {
  private router = inject(Router);
  private productService = inject(ProductService);

  IMAGES = IMAGES;
  ICONS = ICONS;

  featuredProducts = computed(() => this.productService.featuredProducts());

  async ngOnInit(): Promise<void> {
    await this.productService.loadFeaturedProducts();
  }

  onProductClick(productId: string): void {
    this.router.navigate(['/products', productId]);
  }
}
