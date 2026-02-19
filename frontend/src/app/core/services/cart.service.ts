import { Injectable, signal, computed, inject } from '@angular/core';
import { Product, ProductWithHelpers } from '../models/product.model';
import { TranslationService } from './translation.service';
import { CurrencyService } from './currency.service';

export interface CartItem {
  product: ProductWithHelpers;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private translationService = inject(TranslationService);
  private currencyService = inject(CurrencyService);

  private cartItems = signal<CartItem[]>([]);

  items = this.cartItems.asReadonly();

  itemCount = computed(() => this.cartItems().reduce((sum, item) => sum + item.quantity, 0));

  totalPrice = computed(() =>
    this.cartItems().reduce((sum, item) => {
      const price = this.getProductPrice(item.product);
      const salePercentage = parseFloat(item.product.sale_percentage) || 0;
      const finalPrice = salePercentage > 0 ? price * (1 - salePercentage / 100) : price;
      return sum + finalPrice * item.quantity;
    }, 0),
  );

  constructor() {
    this.loadCartFromStorage();
  }

  private getProductPrice(product: Product): number {
    const currencyCode = this.currencyService.currentCurrency().code;

    switch (currencyCode) {
      case 'HUF':
        return parseFloat(product.price_huf) || 0;
      case 'USD':
        return parseFloat(product.price_usd) || 0;
      case 'EUR':
        return parseFloat(product.price_eur) || 0;
      default:
        return parseFloat(product.price_huf) || 0;
    }
  }

  getProductName(product: Product): string {
    const currentLang = this.translationService.getCurrentLanguage();

    switch (currentLang) {
      case 'hu':
        return product.name_hu;
      case 'en':
        return product.name_en;
      case 'de':
        return product.name_de;
      default:
        return product.name_en;
    }
  }

  getProductDescription(product: Product, preview: boolean = false): string {
    const currentLang = this.translationService.getCurrentLanguage();

    if (preview) {
      switch (currentLang) {
        case 'hu':
          return product.description_preview_hu;
        case 'en':
          return product.description_preview_en;
        case 'de':
          return product.description_preview_de;
        default:
          return product.description_preview_en;
      }
    }

    switch (currentLang) {
      case 'hu':
        return product.description_hu;
      case 'en':
        return product.description_en;
      case 'de':
        return product.description_de;
      default:
        return product.description_en;
    }
  }

  addToCart(product: ProductWithHelpers, quantity: number = 1): void {
    const existingItem = this.cartItems().find((item) => item.product.id === product.id);

    if (existingItem) {
      this.updateQuantity(product.id, existingItem.quantity + quantity);
    } else {
      this.cartItems.update((items) => [...items, { product, quantity }]);
    }

    this.saveCartToStorage();
  }

  removeFromCart(productId: string): void {
    this.cartItems.update((items) => items.filter((item) => item.product.id !== productId));
    this.saveCartToStorage();
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.cartItems.update((items) =>
      items.map((item) => {
        if (item.product.id === productId) {
          const maxStock = parseFloat(item.product.stock) || 0;
          return { ...item, quantity: Math.min(quantity, maxStock) };
        }
        return item;
      }),
    );

    this.saveCartToStorage();
  }

  clearCart(): void {
    this.cartItems.set([]);
    this.saveCartToStorage();
  }

  isInCart(productId: string): boolean {
    return this.cartItems().some((item) => item.product.id === productId);
  }

  getItemQuantity(productId: string): number {
    const item = this.cartItems().find((item) => item.product.id === productId);
    return item?.quantity ?? 0;
  }

  private saveCartToStorage(): void {
    try {
      localStorage.setItem('cart', JSON.stringify(this.cartItems()));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }

  private loadCartFromStorage(): void {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart) as CartItem[];
        this.cartItems.set(parsedCart);
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }
}
