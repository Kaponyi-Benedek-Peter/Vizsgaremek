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
  showDownloadConfirmation = signal(false);
  lastTrackingToken = signal('');

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

  acceptedTerms = false;

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

  async generateOrderConfirmationPdf(trackingToken: string): Promise<void> {
    const jspdfModule = await import('jspdf');
    const autoTableModule = await import('jspdf-autotable');
    const jsPDF = jspdfModule.default;
    const autoTable = autoTableModule.default;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(18);
    doc.setFont(undefined!, 'bold');
    doc.text("Roy's Shack Est. 1888", 14, 22);

    doc.setFontSize(12);
    doc.setFont(undefined!, 'normal');
    doc.setTextColor(6, 122, 69);
    doc.text('Order Confirmation / Rendelés visszaigazolás', 14, 32);
    doc.setTextColor(0, 0, 0);

    doc.setDrawColor(6, 122, 69);
    doc.setLineWidth(0.8);
    doc.line(14, 36, pageWidth - 14, 36);

    let y = 45;
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);

    const infoLines = [
      [
        'Date / Dátum:',
        new Date().toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' }),
      ],
      ['Tracking:', trackingToken || '—'],
      ['Name / Név:', this.form.billingName],
      ['Email:', this.form.email],
      [
        'Address / Cím:',
        `${this.form.zipcode} ${this.form.city}, ${this.form.address} ${this.form.houseNumber}${this.form.apartmentNumber ? '/' + this.form.apartmentNumber : ''}`,
      ],
      ['Phone / Telefon:', this.form.phoneNumber],
    ];

    infoLines.forEach(([label, value]) => {
      doc.setFont(undefined!, 'bold');
      doc.setTextColor(80, 80, 80);
      doc.text(label, 14, y);
      doc.setFont(undefined!, 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(value, 55, y);
      y += 6;
    });

    y += 4;

    const headers = ['Product', 'Qty', 'Unit Price', 'Total'];
    const rows = this.cartItems().map((item) => [
      item.product.name || '—',
      String(item.quantity),
      this.getFormattedUnitPrice(item.product),
      this.getFormattedItemTotal(item.product, item.quantity),
    ]);

    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: y,
      styles: { fontSize: 8.5, cellPadding: 4 },
      headStyles: {
        fillColor: [6, 122, 69],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { halign: 'center', cellWidth: 20 },
        2: { halign: 'right', cellWidth: 35 },
        3: { halign: 'right', cellWidth: 35 },
      },
      margin: { left: 14, right: 14 },
    });

    const finalY = (doc as any).lastAutoTable.finalY + 8;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(pageWidth - 85, finalY, pageWidth - 14, finalY);

    doc.setFontSize(11);
    doc.setFont(undefined!, 'bold');
    doc.text('Total:', pageWidth - 85, finalY + 8);
    doc.text(this.currencyService.formatPrice(this.cartTotal()), pageWidth - 14, finalY + 8, {
      align: 'right',
    });

    if (this.form.note) {
      doc.setFontSize(8);
      doc.setFont(undefined!, 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(`Note: ${this.form.note}`, 14, finalY + 20);
    }

    const disclaimerY = doc.internal.pageSize.getHeight() - 25;
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.text('This document is an order confirmation, not a fiscal invoice.', 14, disclaimerY);
    doc.text('Ez a dokumentum rendelés visszaigazolás, nem adóügyi számla.', 14, disclaimerY + 4);
    doc.text(
      'Dieses Dokument ist eine Bestellbestätigung, keine Steuerrechnung.',
      14,
      disclaimerY + 8,
    );

    doc.save(`order-confirmation-${trackingToken || Date.now()}.pdf`);
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

        const trackingToken = response.tracking_token ?? '';
        this.lastTrackingToken.set(trackingToken);
        this.showDownloadConfirmation.set(true);

        await this.generateOrderConfirmationPdf(trackingToken);

        this.cartService.clearCart();

        setTimeout(() => {
          this.router.navigate([this.isGuest() ? '/home' : '/profile']);
        }, 3500);
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
    if (!this.acceptedTerms) {
      this.errorMessage.set('checkout.terms_required');
      return false;
    }
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
