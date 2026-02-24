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
      return sum + this.getItemTotal(item.product, item.quantity);
    }, 0),
  );

  constructor() {
    this.loadCartFromStorage();
  }

  getProductPrice(product: Product): number {
    return this.currencyService.getBasePrice(product);
  }

  getProductFinalPrice(product: Product): number {
    return this.currencyService.getDiscountedPrice(product);
  }

  getItemTotal(product: Product, quantity: number): number {
    return this.currencyService.getDiscountedPrice(product) * quantity;
  }

  /**
   * Formats a price using the current currency.
   * Use this in templates instead of showing product.price directly.
   */
  formatPrice(price: number): string {
    return this.currencyService.formatPrice(price);
  }

  /**
   * Returns the correctly converted unit price for a product,
   * formatted as a string with currency symbol.
   */
  getFormattedUnitPrice(product: Product): string {
    return this.currencyService.formatPrice(this.currencyService.getDiscountedPrice(product));
  }

  /**
   * Returns the formatted total price for a cart item (unit price × quantity).
   */
  getFormattedItemTotal(product: Product, quantity: number): string {
    return this.currencyService.formatPrice(this.getItemTotal(product, quantity));
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

  /**
   * Adds a product to the cart.
   *
   * - If the product is already in the cart: instead of increasing the quantity,
   *   it overwrites it with the new value (setQuantity mode),
   *   unless explicitMode = false, in which case it adds to the existing quantity (addMode).
   * - If the product is not in the cart: it adds it as a new item with the specified quantity.
   *
   * @param product   The product to be added
   * @param quantity  Quantity (default: 1)
   * @param addMode   true = add to existing quantity | false = overwrite (default: true)
   */
  addToCart(product: ProductWithHelpers, quantity: number = 1, addMode: boolean = true): void {
    const existingItem = this.cartItems().find((item) => item.product.id === product.id);

    if (existingItem) {
      const newQuantity = addMode ? existingItem.quantity + quantity : quantity;
      this.updateQuantity(product.id, newQuantity);
    } else {
      this.cartItems.update((items) => [...items, { product, quantity }]);
      this.saveCartToStorage();
    }
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
