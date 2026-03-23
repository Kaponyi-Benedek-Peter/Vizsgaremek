import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProductWithHelpers, ProductImage, enrichProduct } from '../../core/models/product.model';
import { ReviewWithHelpers } from '../../core/models/review.model';
import { ProductService } from '../../core/services/product.service';
import { ReviewService } from '../../core/services/review.service';
import { CartService } from '../../core/services/cart.service';
import { CurrencyService } from '../../core/services/currency.service';
import { TranslationService } from '../../core/services/translation.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';
import { Subscription } from 'rxjs';
import { ICONS } from '../../core/constants/visuals';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [DatePipe, TranslateModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private reviewService = inject(ReviewService);
  private cartService = inject(CartService);
  private currencyService = inject(CurrencyService);
  private translationService = inject(TranslationService);

  protected readonly icons = ICONS;

  private currentLang = toSignal(this.translationService.currentLang$, {
    initialValue: this.translationService.getCurrentLanguage(),
  });
  private langSub?: Subscription;

  product = signal<ProductWithHelpers | null>(null);
  reviews = signal<ReviewWithHelpers[]>([]);
  isLoading = signal(true);
  reviewsLoading = signal(false);
  notFound = signal(false);
  quantity = signal(1);
  selectedImageIndex = signal(0);
  addedToCart = signal(false);

  private galleryImages = signal<ProductImage[]>([]);

  canGoPrevious = computed(() => this.selectedImageIndex() > 0);
  canGoNext = computed(
    () => this.product() !== null && this.selectedImageIndex() < this.product()!.images.length - 1,
  );

  review_count = computed(() => this.reviews().length);

  get images(): string[] {
    return this.product()?.images ?? [];
  }

  get selectedImage(): string {
    return this.images[this.selectedImageIndex()] ?? '';
  }

  get has_discount(): boolean {
    return this.product()?.has_discount ?? false;
  }

  formattedPrice = computed(() => {
    const p = this.product();
    if (!p) return '';
    return this.currencyService.formatPrice(this.currencyService.getBasePrice(p));
  });

  formattedDiscountedPrice = computed(() => {
    const p = this.product();
    if (!p) return '';
    return this.currencyService.formatPrice(this.currencyService.getDiscountedPrice(p));
  });

  formattedTotalPrice = computed(() => {
    const p = this.product();
    if (!p) return '';
    const unitPrice = this.currencyService.getDiscountedPrice(p);
    return this.currencyService.formatPrice(unitPrice * this.quantity());
  });

  get canAddToCart(): boolean {
    const p = this.product();
    return !!(p?.in_stock && !p?.requires_prescription && this.quantity() <= p.stock_quantity);
  }

  get categoryName(): string {
    const cat = this.productService.getCategoryById(this.product()?.category ?? '');
    const lang = this.currentLang();
    if (!cat) return '';
    return lang === 'hu' ? cat.name_hu : lang === 'de' ? cat.name_de : cat.name_en;
  }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/products']);
      return;
    }

    await Promise.all([this.productService.loadProducts(), this.productService.loadCategories()]);

    const all = this.productService.products();
    const found = all.find((p) => p.id === id);

    if (found) {
      this.product.set(found);
      this.loadReviews(id);
      this.loadProductImages(id, found);
    } else {
      this.notFound.set(true);
    }

    this.isLoading.set(false);

    this.langSub = this.translationService.currentLang$.subscribe((lang) => {
      const current = this.product();
      if (current) {
        this.product.set(enrichProduct(current, lang, this.galleryImages()));
      }
    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
    document.body.style.overflow = '';
  }

  private async loadProductImages(
    productId: string,
    rawProduct: ProductWithHelpers,
  ): Promise<void> {
    try {
      const images = await firstValueFrom(this.productService.getProductImages(productId));
      this.galleryImages.set(images);

      const lang = this.currentLang();
      this.product.set(enrichProduct(rawProduct, lang, images));
      this.selectedImageIndex.set(0);
    } catch (err) {
      console.warn('Could not load gallery images, thumbnail will be used', err);
    }
  }

  private async loadReviews(productId: string): Promise<void> {
    this.reviewsLoading.set(true);
    try {
      const reviews = await firstValueFrom(this.reviewService.getReviewsByProductId(productId));
      this.reviews.set(reviews);
    } finally {
      this.reviewsLoading.set(false);
    }
  }

  getRatingStars(rating_number?: number): string {
    const rating = rating_number ?? this.product()?.rating_number ?? 0;
    if (!rating) return '';
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return '★'.repeat(full) + (half ? '⯨' : '') + '☆'.repeat(empty);
  }

  selectImage(index: number): void {
    this.selectedImageIndex.set(index);
  }

  nextImage(): void {
    if (this.canGoNext()) {
      this.selectedImageIndex.update((i) => i + 1);
    }
  }

  previousImage(): void {
    if (this.canGoPrevious()) {
      this.selectedImageIndex.update((i) => i - 1);
    }
  }

  increaseQuantity(): void {
    const p = this.product();
    if (p && this.quantity() < p.stock_quantity) {
      this.quantity.update((q) => q + 1);
    }
  }

  decreaseQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.update((q) => q - 1);
    }
  }

  handleAddToCart(): void {
    const p = this.product();
    if (this.canAddToCart && p) {
      this.cartService.addToCart(p, this.quantity());
      this.addedToCart.set(true);
      setTimeout(() => this.addedToCart.set(false), 2500);
    }
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
