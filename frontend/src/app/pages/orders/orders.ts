import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService, AdminOrder } from '../../core/services/account.service';
import { AuthService } from '../../core/services/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
  private accountService = inject(AccountService);
  private authService = inject(AuthService);
  private translateService = inject(TranslateService);

  orders = signal<AdminOrder[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  expandedOrderId = signal<string | null>(null);

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.loading.set(true);
    this.error.set(null);

    const accountState = this.authService.currentUser()?.account_state ?? '';
    const isAdmin = accountState === 'admin' || accountState === 'superadmin';

    if (isAdmin) {
      this.accountService.getAllOrdersAdmin().subscribe({
        next: (res) => {
          this.orders.set(res?.orders ?? []);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err?.message ?? 'orders.error_load');
          this.loading.set(false);
        },
      });
      return;
    }

    const userId =
      this.authService.getUserId() ??
      sessionStorage.getItem('user_id') ??
      localStorage.getItem('user_id') ??
      '';
    const token = this.authService.getSessionToken() ?? this.authService.getToken() ?? '';

    if (!userId || !token) {
      this.error.set('orders.error_load');
      this.loading.set(false);
      return;
    }

    this.accountService.getOrders({ id: userId, session_token: token }).subscribe({
      next: (res) => {
        this.orders.set(res?.orders ?? []);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.message ?? 'orders.error_load');
        this.loading.set(false);
      },
    });
  }

  formatPhone(raw: string | undefined): string {
    if (!raw) return '—';
    const digits = raw.replace(/\D/g, '');
    if (!digits) return '—';
    if (digits.length >= 9) {
      const cc = digits.slice(0, 2);
      const area = digits.slice(2, 4);
      const p1 = digits.slice(4, 7);
      const p2 = digits.slice(7);
      return `+${cc}\u00a0${area}\u00a0${p1}\u00a0${p2}`;
    }
    return digits;
  }

  toggle(orderId: string) {
    this.expandedOrderId.set(this.expandedOrderId() === orderId ? null : orderId);
  }

  isExpanded(orderId: string) {
    return this.expandedOrderId() === orderId;
  }

  trackByOrder(order: any) {
    return order.id;
  }
}
