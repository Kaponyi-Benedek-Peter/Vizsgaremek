import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

import { CartService } from '../../core/services/cart.service';
import { CurrencyService } from '../../core/services/currency.service';
import { AuthService } from '../../core/services/auth.service';
import { AccountService } from '../../core/services/account.service';
import { ToastService } from '../../core/services/toast.service';

interface CheckoutForm {
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
  imports: [CommonModule, RouterModule, FormsModule, TranslateModule],
  templateUrl: './purchase.html',
  styleUrl: './purchase.css',
})
export class Purchase implements OnInit {
  private cartService = inject(CartService);
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
    city: '',
    zipcode: '',
    address: '',
    houseNumber: '',
    apartmentNumber: '',
    phoneNumber: '',
    note: '',
  };

  ngOnInit(): void {
    if (!this.authService.isUserAuthenticated()) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/purchase' },
      });
      return;
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

  getItemTotal(price: number, quantity: number, discountPercentage?: number): number {
    const finalPrice = discountPercentage ? price * (1 - discountPercentage / 100) : price;
    return finalPrice * quantity;
  }

  async submitOrder(): Promise<void> {
    if (!this.validateForm()) return;

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    try {
      const orderData = {
        city: this.form.city,
        zipcode: this.form.zipcode,
        address: this.form.address,
        houseNumber: parseInt(this.form.houseNumber),
        apartmentNumber: this.form.apartmentNumber ? parseInt(this.form.apartmentNumber) : 0,
        phoneNumber: this.form.phoneNumber,
        note: this.form.note,
        items: this.cartItems().map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      };

      const response = await firstValueFrom(this.accountService.createOrder(orderData));

      if (response.statuscode === '200') {
        this.successMessage.set('checkout.success');
        this.toastService.success('checkout.success');
        this.cartService.clearCart();

        setTimeout(() => {
          this.router.navigate(['/profile']);
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
