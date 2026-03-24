import {
  TranslationService
} from "./chunk-NEOTYJOM.js";
import {
  HttpClient
} from "./chunk-YSEAUUG4.js";
import {
  DestroyRef,
  Injectable,
  Observable,
  RuntimeError,
  __spreadProps,
  __spreadValues,
  assertInInjectionContext,
  assertNotInReactiveContext,
  computed,
  inject,
  setClassMetadata,
  signal,
  takeUntil,
  ɵɵdefineInjectable
} from "./chunk-WLHV2EEC.js";

// node_modules/@angular/core/fesm2022/rxjs-interop.mjs
function takeUntilDestroyed(destroyRef) {
  if (!destroyRef) {
    ngDevMode && assertInInjectionContext(takeUntilDestroyed);
    destroyRef = inject(DestroyRef);
  }
  const destroyed$ = new Observable((subscriber) => {
    if (destroyRef.destroyed) {
      subscriber.next();
      return;
    }
    const unregisterFn = destroyRef.onDestroy(subscriber.next.bind(subscriber));
    return unregisterFn;
  });
  return (source) => {
    return source.pipe(takeUntil(destroyed$));
  };
}
function toSignal(source, options) {
  typeof ngDevMode !== "undefined" && ngDevMode && assertNotInReactiveContext(toSignal, "Invoking `toSignal` causes new subscriptions every time. Consider moving `toSignal` outside of the reactive context and read the signal value where needed.");
  const requiresCleanup = !options?.manualCleanup;
  if (ngDevMode && requiresCleanup && !options?.injector) {
    assertInInjectionContext(toSignal);
  }
  const cleanupRef = requiresCleanup ? options?.injector?.get(DestroyRef) ?? inject(DestroyRef) : null;
  const equal = makeToSignalEqual(options?.equal);
  let state;
  if (options?.requireSync) {
    state = signal({
      kind: 0
    }, __spreadValues({
      equal
    }, ngDevMode ? createDebugNameObject(options?.debugName, "state") : void 0));
  } else {
    state = signal({
      kind: 1,
      value: options?.initialValue
    }, __spreadValues({
      equal
    }, ngDevMode ? createDebugNameObject(options?.debugName, "state") : void 0));
  }
  let destroyUnregisterFn;
  const sub = source.subscribe({
    next: (value) => state.set({
      kind: 1,
      value
    }),
    error: (error) => {
      state.set({
        kind: 2,
        error
      });
      destroyUnregisterFn?.();
    },
    complete: () => {
      destroyUnregisterFn?.();
    }
  });
  if (options?.requireSync && state().kind === 0) {
    throw new RuntimeError(601, (typeof ngDevMode === "undefined" || ngDevMode) && "`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.");
  }
  destroyUnregisterFn = cleanupRef?.onDestroy(sub.unsubscribe.bind(sub));
  return computed(() => {
    const current = state();
    switch (current.kind) {
      case 1:
        return current.value;
      case 2:
        throw current.error;
      case 0:
        throw new RuntimeError(601, (typeof ngDevMode === "undefined" || ngDevMode) && "`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.");
    }
  }, __spreadValues({
    equal: options?.equal
  }, ngDevMode ? createDebugNameObject(options?.debugName, "source") : void 0));
}
function makeToSignalEqual(userEquality = Object.is) {
  return (a, b) => a.kind === 1 && b.kind === 1 && userEquality(a.value, b.value);
}
function createDebugNameObject(toSignalDebugName, internalSignalDebugName) {
  return {
    debugName: `toSignal${toSignalDebugName ? "#" + toSignalDebugName : ""}.${internalSignalDebugName}`
  };
}

// src/app/core/services/currency.service.ts
var CurrencyService = class _CurrencyService {
  translationService = inject(TranslationService);
  http = inject(HttpClient);
  currentLang = toSignal(this.translationService.currentLang$, {
    initialValue: "en"
  });
  // Fallback rates: 1 HUF in USD / EUR (approximate)
  ratesSignal = signal({
    USD: 28e-4,
    EUR: 26e-4
  }, ...ngDevMode ? [{ debugName: "ratesSignal" }] : []);
  currencyMap = {
    hu: { code: "HUF", symbol: "Ft", locale: "hu-HU" },
    en: { code: "USD", symbol: "$", locale: "en-US" },
    de: { code: "EUR", symbol: "\u20AC", locale: "de-DE" }
  };
  currentCurrency = computed(() => this.currencyMap[this.currentLang()], ...ngDevMode ? [{ debugName: "currentCurrency" }] : []);
  getBasePrice(product) {
    const code = this.currentCurrency().code;
    const hufPrice = parseFloat(product.price_huf) || 0;
    switch (code) {
      case "USD":
        return parseFloat(product.price_usd ?? "0") || hufPrice;
      case "EUR":
        return parseFloat(product.price_eur ?? "0") || hufPrice;
      default:
        return hufPrice;
    }
  }
  getDiscountedPrice(product) {
    const base = this.getBasePrice(product);
    const sale = parseFloat(product.sale_percentage) || 0;
    return sale > 0 ? Math.round(base * (1 - sale / 100) * 100) / 100 : base;
  }
  formatPrice(price) {
    const currency = this.currentCurrency();
    const formatted = price.toLocaleString(currency.locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
    return currency.code === "HUF" ? `${formatted} ${currency.symbol}` : `${currency.symbol}${formatted}`;
  }
  getCurrencyForLanguage(lang) {
    return this.currencyMap[lang];
  }
  getCurrentCurrencyCode() {
    return this.currentCurrency().code;
  }
  getCurrentCurrencySymbol() {
    return this.currentCurrency().symbol;
  }
  static \u0275fac = function CurrencyService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CurrencyService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CurrencyService, factory: _CurrencyService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CurrencyService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/core/services/cart.service.ts
var CartService = class _CartService {
  translationService = inject(TranslationService);
  currencyService = inject(CurrencyService);
  cartItems = signal([], ...ngDevMode ? [{ debugName: "cartItems" }] : []);
  items = this.cartItems.asReadonly();
  itemCount = computed(() => this.cartItems().reduce((sum, item) => sum + item.quantity, 0), ...ngDevMode ? [{ debugName: "itemCount" }] : []);
  totalPrice = computed(() => this.cartItems().reduce((sum, item) => {
    return sum + this.getItemTotal(item.product, item.quantity);
  }, 0), ...ngDevMode ? [{ debugName: "totalPrice" }] : []);
  constructor() {
    this.loadCartFromStorage();
  }
  getProductPrice(product) {
    return this.currencyService.getBasePrice(product);
  }
  getProductFinalPrice(product) {
    return this.currencyService.getDiscountedPrice(product);
  }
  getItemTotal(product, quantity) {
    return this.currencyService.getDiscountedPrice(product) * quantity;
  }
  /**
   * Formats a price using the current currency.
   * Use this in templates instead of showing product.price directly.
   */
  formatPrice(price) {
    return this.currencyService.formatPrice(price);
  }
  /**
   * Returns the correctly converted unit price for a product,
   * formatted as a string with currency symbol.
   */
  getFormattedUnitPrice(product) {
    return this.currencyService.formatPrice(this.currencyService.getDiscountedPrice(product));
  }
  /**
   * Returns the formatted total price for a cart item (unit price × quantity).
   */
  getFormattedItemTotal(product, quantity) {
    return this.currencyService.formatPrice(this.getItemTotal(product, quantity));
  }
  getProductName(product) {
    const currentLang = this.translationService.getCurrentLanguage();
    switch (currentLang) {
      case "hu":
        return product.name_hu;
      case "en":
        return product.name_en;
      case "de":
        return product.name_de;
      default:
        return product.name_en;
    }
  }
  getProductDescription(product, preview = false) {
    const currentLang = this.translationService.getCurrentLanguage();
    if (preview) {
      switch (currentLang) {
        case "hu":
          return product.description_preview_hu;
        case "en":
          return product.description_preview_en;
        case "de":
          return product.description_preview_de;
        default:
          return product.description_preview_en;
      }
    }
    switch (currentLang) {
      case "hu":
        return product.description_hu;
      case "en":
        return product.description_en;
      case "de":
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
  addToCart(product, quantity = 1, addMode = true) {
    const existingItem = this.cartItems().find((item) => item.product.id === product.id);
    if (existingItem) {
      const newQuantity = addMode ? existingItem.quantity + quantity : quantity;
      this.updateQuantity(product.id, newQuantity);
    } else {
      this.cartItems.update((items) => [...items, { product, quantity }]);
      this.saveCartToStorage();
    }
  }
  removeFromCart(productId) {
    this.cartItems.update((items) => items.filter((item) => item.product.id !== productId));
    this.saveCartToStorage();
  }
  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.cartItems.update((items) => items.map((item) => {
      if (item.product.id === productId) {
        const maxStock = parseFloat(item.product.stock) || 0;
        return __spreadProps(__spreadValues({}, item), { quantity: Math.min(quantity, maxStock) });
      }
      return item;
    }));
    this.saveCartToStorage();
  }
  clearCart() {
    this.cartItems.set([]);
    this.saveCartToStorage();
  }
  isInCart(productId) {
    return this.cartItems().some((item) => item.product.id === productId);
  }
  getItemQuantity(productId) {
    const item = this.cartItems().find((item2) => item2.product.id === productId);
    return item?.quantity ?? 0;
  }
  saveCartToStorage() {
    try {
      localStorage.setItem("cart", JSON.stringify(this.cartItems()));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }
  loadCartFromStorage() {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        this.cartItems.set(parsedCart);
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
  }
  static \u0275fac = function CartService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CartService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CartService, factory: _CartService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CartService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

export {
  takeUntilDestroyed,
  toSignal,
  CurrencyService,
  CartService
};
/*! Bundled license information:

@angular/core/fesm2022/rxjs-interop.mjs:
  (**
   * @license Angular v21.0.6
   * (c) 2010-2025 Google LLC. https://angular.dev/
   * License: MIT
   *)
*/
//# sourceMappingURL=chunk-2QWXMZZS.js.map
