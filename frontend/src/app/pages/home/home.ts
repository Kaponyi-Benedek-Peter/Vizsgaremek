import { Component, inject, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

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
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  IMAGES = IMAGES;
  ICONS = ICONS;

  featuredProducts = computed(() => this.productService.featuredProducts());

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['activate']) {
        const parts = params['activate'].split(';');
        if (parts.length === 2) {
          const id = parts[0].trim();
          const token = parts[1].trim();
          this.authService.completeRegistration(id, token, true).subscribe({
            next: () => {
              // successful activation
              this.router.navigate(['/home'], { replaceUrl: true });
            },
            error: () => {
              this.router.navigate(['/home'], { replaceUrl: true });
            },
          });
        }
      }
    });

    this.productService.loadFeaturedProducts();
  }

  onProductClick(productId: string): void {
    this.router.navigate(['/products', productId]);
  }
}
