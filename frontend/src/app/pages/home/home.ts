import { Component, inject, computed, OnInit, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

import { Slide } from '../../shared/components/slide/slide';
import { Featured } from '../../shared/components/featured/featured';
import { FeaturedProductCard } from '../../shared/components/featured-product-card/featured-product-card';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { ICONS, IMAGES } from '../../core/constants/visuals';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Slide, Featured, FeaturedProductCard, ScrollRevealDirective, TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private router = inject(Router);
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  IMAGES = IMAGES;
  ICONS = ICONS;

  featuredProducts = computed(() => this.productService.featuredProducts());

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      if (params['activate']) {
        const parts = params['activate'].split(';');
        if (parts.length === 2) {
          const id = parts[0].trim();
          const token = parts[1].trim();
          this.authService.completeRegistration(id, token, true).subscribe({
            next: () => {
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
