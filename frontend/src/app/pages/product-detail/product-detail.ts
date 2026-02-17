import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProductWithHelpers } from '../../core/models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../core/services/cart.service';
import { CurrencyService } from '../../core/services/currency.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private currencyService = inject(CurrencyService);

  product = signal<ProductWithHelpers | null>(null);
  isLoading = signal(true);
  notFound = signal(false);
  quantity = signal(1);
  selectedImageIndex = signal(0);
  addedToCart = signal(false);

  canGoPrevious = computed(() => this.selectedImageIndex() > 0);
  canGoNext = computed(
    () => this.product() !== null && this.selectedImageIndex() < this.product()!.images.length - 1,
  );

  get images(): string[] {
    return this.product()?.images ?? [];
  }

  get selectedImage(): string {
    return this.images[this.selectedImageIndex()] ?? '';
  }

  get hasDiscount(): boolean {
    return this.product()?.hasDiscount ?? false;
  }

  get formattedPrice(): string {
    const p = this.product();
    if (!p) return '';
    return this.currencyService.formatPrice(p.priceNumber);
  }

  get formattedDiscountedPrice(): string {
    const p = this.product();
    if (!p) return '';
    return this.currencyService.formatPrice(p.price);
  }

  get formattedTotalPrice(): string {
    const p = this.product();
    if (!p) return '';
    const basePrice = p.hasDiscount ? p.price : p.priceNumber;
    return this.currencyService.formatPrice(basePrice * this.quantity());
  }

  get canAddToCart(): boolean {
    const p = this.product();
    return !!(p?.inStock && !p?.requiresPrescription && this.quantity() <= p.stockQuantity);
  }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/products']);
      return;
    }

    await this.productService.loadProducts();
    const all = this.productService.products();
    const found = all.find((p) => p.id === id);

    if (found) {
      this.product.set(found);
    } else {
      this.notFound.set(true);
    }

    this.isLoading.set(false);
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
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
    if (p && this.quantity() < p.stockQuantity) {
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

  getRatingStars(): string {
    const p = this.product();
    if (!p?.ratingNumber) return '';
    const full = Math.floor(p.ratingNumber);
    const half = p.ratingNumber % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return '★'.repeat(full) + (half ? '⯨' : '') + '☆'.repeat(empty);
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
