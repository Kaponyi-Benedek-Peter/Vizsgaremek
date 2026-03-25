import {
  Component,
  HostListener,
  OnInit,
  OnDestroy,
  signal,
  computed,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { PrimaryBtn } from '../primary-btn/primary-btn';
import { IconBtn } from '../icon-btn/icon-btn';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { ICONS, IMAGES } from '../../../core/constants/visuals';
import { ThemeService, Theme } from '../../../core/services/theme.service';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { CurrencyService } from '../../../core/services/currency.service';
import { User } from '../../../core/models/auth.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PrimaryBtn, IconBtn, RouterModule, LanguageSwitcher, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  private themeService = inject(ThemeService);
  private authService = inject(AuthService);
  cartService = inject(CartService);
  currencyService = inject(CurrencyService);

  private subs: Subscription[] = [];
  private prevCartCount = 0;

  ICONS = ICONS;
  IMAGES = IMAGES;
  currentTheme: Theme = 'light';
  isAuthenticated = false;
  isAdmin = false;
  currentUser: User | null = null;
  showUserMenu = signal(false);
  showCartDropdown = signal(false);
  showMobileMenu = signal(false);
  cartBounce = signal(false);

  cartItemCount = computed(() => this.cartService.itemCount());
  cartItems = computed(() => this.cartService.items());
  cartTotal = computed(() => this.cartService.totalPrice());

  ngOnInit(): void {
    this.subs.push(
      this.themeService.currentTheme$.subscribe((theme) => {
        this.currentTheme = theme;
      }),
      this.authService.authState$.subscribe((state) => {
        this.isAuthenticated = state.isAuthenticated;
        this.currentUser = state.user;
        this.isAdmin = state.role === 'admin';
      }),
    );

    const checkBounce = setInterval(() => {
      const count = this.cartItemCount();
      if (count > this.prevCartCount) {
        this.cartBounce.set(true);
        setTimeout(() => this.cartBounce.set(false), 500);
      }
      this.prevCartCount = count;
    }, 200);

    this.subs.push({ unsubscribe: () => clearInterval(checkBounce) } as Subscription);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  toggleMobileMenu(): void {
    this.showMobileMenu.update((v) => !v);
    if (this.showMobileMenu()) {
      this.showUserMenu.set(false);
      this.showCartDropdown.set(false);
    }
  }

  closeMobileMenu(): void {
    this.showMobileMenu.set(false);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleUserMenu(): void {
    this.showUserMenu.update((v) => !v);
    if (this.showCartDropdown()) {
      this.showCartDropdown.set(false);
    }
  }

  toggleCartDropdown(): void {
    this.showCartDropdown.update((v) => !v);
    if (this.showUserMenu()) {
      this.showUserMenu.set(false);
    }
  }

  closeUserMenu(): void {
    this.showUserMenu.set(false);
  }

  closeCartDropdown(): void {
    this.showCartDropdown.set(false);
  }

  logout(): void {
    this.authService.logout();
    this.closeUserMenu();
  }

  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(productId: string, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  goToCheckout(): void {
    this.closeCartDropdown();
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.showUserMenu.set(false);
    this.showCartDropdown.set(false);
    this.showMobileMenu.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const userMenuWrapper = target.closest('.user-menu-wrapper');
    const cartMenuWrapper = target.closest('.cart-menu-wrapper');
    const mobileMenuWrapper = target.closest('.mobile-menu-wrapper');

    if (!userMenuWrapper && this.showUserMenu()) {
      this.closeUserMenu();
    }

    if (!cartMenuWrapper && this.showCartDropdown()) {
      this.closeCartDropdown();
    }

    if (!mobileMenuWrapper && this.showMobileMenu()) {
      this.closeMobileMenu();
    }
  }
}
