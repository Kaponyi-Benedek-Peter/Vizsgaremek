import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService, AdminOrder } from '../../core/services/account.service';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, TranslateModule],
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

    const userId =
      this.authService.getUserId() ??
      sessionStorage.getItem('user_id') ??
      localStorage.getItem('user_id') ??
      '';
    const token = this.authService.getSessionToken() ?? this.authService.getToken() ?? '';

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
