import { Component, OnInit, signal, computed, inject } from '@angular/core';

import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

import { CartService } from '../../core/services/cart.service';
import { CurrencyService } from '../../core/services/currency.service';
import { AuthService } from '../../core/services/auth.service';
import { AccountService, CreateOrderRequest } from '../../core/services/account.service';
import { ToastService } from '../../core/services/toast.service';
import { Product } from '../../core/models/product.model';

interface CheckoutForm {
  email: string;
  billingName: string;
  city: string;
  zipcode: string;
  address: string;
  houseNumber: string;
  apartmentNumber: string;
  phoneNumber: string;
  note: string;
}

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [RouterModule, FormsModule, TranslateModule],
  templateUrl: './purchase.html',
  styleUrl: './purchase.css',
})
export class Purchase implements OnInit {
  cartService = inject(CartService);
  public currencyService = inject(CurrencyService);
  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  cartItems = computed(() => this.cartService.items());
  cartTotal = computed(() => this.cartService.totalPrice());
  cartItemCount = computed(() => this.cartService.itemCount());

  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  form: CheckoutForm = {
    email: '',
    billingName: '',
    city: '',
    zipcode: '',
    address: '',
    houseNumber: '',
    apartmentNumber: '',
    phoneNumber: '',
    note: '',
  };

  isGuest = signal(false);

  ngOnInit(): void {
    this.isGuest.set(!this.authService.isUserAuthenticated());

    if (!this.isGuest()) {
      const user = this.authService.currentUser();
      this.form.email = user?.email ?? '';
      this.form.billingName = `${user?.firstname ?? ''} ${user?.lastname ?? ''}`.trim();
    }

    if (this.cartItems().length === 0) {
      this.router.navigate(['/products']);
    }
  }

  updateQuantity(productId: string, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId);

    if (this.cartItems().length === 0) {
      this.router.navigate(['/products']);
    }
  }

  getFormattedUnitPrice(product: Product): string {
    return this.currencyService.formatPrice(this.currencyService.getDiscountedPrice(product));
  }

  getFormattedItemTotal(product: Product, quantity: number): string {
    return this.currencyService.formatPrice(this.cartService.getItemTotal(product, quantity));
  }

  async submitOrder(): Promise<void> {
    if (!this.validateForm()) return;

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    try {
      const user = this.authService.currentUser();
      const isGuest = this.isGuest();

      const orderData: CreateOrderRequest = {
        order: {
          user_id: btoa(isGuest ? '0' : (user?.id ?? '')),
          session_token: btoa(isGuest ? '' : (this.authService.getSessionToken() ?? '')),
          email: btoa(this.form.email),
          billing_name: btoa(this.form.billingName),
          shipping_name: btoa(this.form.billingName),
          shipping_company: btoa(''),
          price: btoa(String(this.cartTotal())),
          city: btoa(this.form.city),
          guest: btoa(isGuest ? '1' : '0'),
          zipcode: btoa(this.form.zipcode),
          address: btoa(this.form.address),
          apartment_number: btoa(this.form.apartmentNumber ?? '0'),
          note: btoa(this.form.note ?? ''),
          house_number: btoa(this.form.houseNumber),
          phone_number: btoa(this.form.phoneNumber),
        },
        items: this.cartItems().map((i) => ({
          product_id: btoa(String(i.product.id)),
          quantity: btoa(String(i.quantity)),
        })),
      };

      const response = await firstValueFrom(this.accountService.createOrder(orderData));

      if (response.statuscode === '200') {
        this.successMessage.set('checkout.success');
        this.toastService.success('checkout.success');
        this.cartService.clearCart();

        setTimeout(() => {
          this.router.navigate([isGuest ? '/home' : '/profile']);
        }, 2000);
      } else {
        this.errorMessage.set('checkout.error');
        this.toastService.error('checkout.error');
      }
    } catch (error) {
      this.errorMessage.set('checkout.error');
      this.toastService.error('checkout.error');
      console.error('Order submission error:', error);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private validateForm(): boolean {
    if (this.isGuest()) {
      if (!this.form.email || !this.form.billingName) {
        this.errorMessage.set('checkout.guest_fields_required');
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
        this.errorMessage.set('checkout.invalid_email');
        return false;
      }
    }

    if (
      !this.form.city ||
      !this.form.zipcode ||
      !this.form.address ||
      !this.form.houseNumber ||
      !this.form.phoneNumber
    ) {
      this.errorMessage.set('checkout.validation_error');
      return false;
    }

    if (!/^\d{4,10}$/.test(this.form.zipcode)) {
      this.errorMessage.set('checkout.invalid_zipcode');
      return false;
    }

    if (!/^\+?\d{9,12}$/.test(this.form.phoneNumber.replace(/\s/g, ''))) {
      this.errorMessage.set('checkout.invalid_phone');
      return false;
    }

    return true;
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }
}
