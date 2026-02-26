import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { AccountService, AdminUser, AdminOrder } from '../../core/services/account.service';
import { ProductService } from '../../services/product.service';
import { ProductWithHelpers } from '../../core/models/product.model';

type AdminSection = 'dashboard' | 'orders' | 'users' | 'products';

interface NavItem {
  id: AdminSection;
  icon: string;
  label: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslateModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  private productService = inject(ProductService);
  private router = inject(Router);

  activeSection = signal<AdminSection>('dashboard');
  sidebarCollapsed = signal(false);

  orderSearch = '';
  orderStatusFilter = 'all';
  userSearch = '';
  productSearch = '';

  usersLoading = signal(false);
  usersError = signal<string | null>(null);
  ordersLoading = signal(false);
  ordersError = signal<string | null>(null);
  productsLoading = signal(false);
  productsError = signal<string | null>(null);

  apiUsers = signal<AdminUser[]>([]);
  apiOrders = signal<AdminOrder[]>([]);

  adminName = computed(() => {
    const user = this.authService.currentUser();
    return user ? `${user.firstname} ${user.lastname}`.trim() : 'Admin';
  });

  stats = computed(() => {
    const orders = this.apiOrders();
    const users = this.apiUsers();
    const products = this.productService.products();

    const totalRevenue = orders.reduce((sum, o) => sum + (parseFloat(o.price) || 0), 0);
    const lowStock = products.filter((p) => p.stockNumber > 0 && p.stockNumber < 10).length;

    return {
      totalOrders: orders.length,
      revenue: totalRevenue,
      totalUsers: users.length,
      totalProducts: products.length,
      lowStock,
    };
  });

  navItems: NavItem[] = [
    { id: 'dashboard', icon: '📊', label: 'admin.nav.dashboard' },
    { id: 'orders', icon: '📦', label: 'admin.nav.orders' },
    { id: 'users', icon: '👥', label: 'admin.nav.users' },
    { id: 'products', icon: '🏷️', label: 'admin.nav.products' },
  ];

  filteredOrders = computed(() => {
    let orders = this.apiOrders();
    if (this.orderSearch) {
      const q = this.orderSearch.toLowerCase();
      orders = orders.filter(
        (o) =>
          o.id.includes(q) ||
          o.user_id.toLowerCase().includes(q) ||
          o.city.toLowerCase().includes(q),
      );
    }
    return orders;
  });

  filteredUsers = computed(() => {
    if (!this.userSearch) return this.apiUsers();
    const q = this.userSearch.toLowerCase();
    return this.apiUsers().filter(
      (u) =>
        u.email.toLowerCase().includes(q) ||
        u.first_name.toLowerCase().includes(q) ||
        u.last_name.toLowerCase().includes(q) ||
        u.id.includes(q),
    );
  });

  filteredProducts = computed(() => {
    const products = this.productService.products();
    if (!this.productSearch) return products;
    const q = this.productSearch.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q),
    );
  });

  recentOrders = computed(() => this.apiOrders().slice(0, 5));

  currentSectionLabel = computed(() => {
    const item = this.navItems.find((n) => n.id === this.activeSection());
    return item?.label || 'admin.nav.dashboard';
  });

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadUsers();
    this.loadOrders();
    this.loadProducts();
  }

  loadUsers(): void {
    this.usersLoading.set(true);
    this.usersError.set(null);

    this.accountService.getAllUsersAdmin().subscribe({
      next: (response) => {
        if (response.statuscode === '200' && Array.isArray(response.users)) {
          this.apiUsers.set(response.users);
        } else {
          this.usersError.set('admin.errors.users_load_failed');
        }
        this.usersLoading.set(false);
      },
      error: (err) => {
        console.error('Admin users load error:', err);
        this.usersError.set('admin.errors.users_load_failed');
        this.usersLoading.set(false);
      },
    });
  }

  loadOrders(): void {
    this.ordersLoading.set(true);
    this.ordersError.set(null);

    this.accountService.getAllOrdersAdmin().subscribe({
      next: (response) => {
        if (response.statuscode === '200' && Array.isArray(response.orders)) {
          this.apiOrders.set(response.orders);
        } else {
          this.ordersError.set('admin.errors.orders_load_failed');
        }
        this.ordersLoading.set(false);
      },
      error: (err) => {
        console.error('Admin orders load error:', err);
        this.ordersError.set('admin.errors.orders_load_failed');
        this.ordersLoading.set(false);
      },
    });
  }

  loadProducts(): void {
    this.productsLoading.set(true);
    this.productsError.set(null);

    this.productService
      .loadProducts()
      .then(() => {
        this.productsLoading.set(false);
      })
      .catch((err) => {
        console.error('Admin products load error:', err);
        this.productsError.set('admin.errors.products_load_failed');
        this.productsLoading.set(false);
      });
  }

  setSection(section: AdminSection): void {
    this.activeSection.set(section);
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.update((v) => !v);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  formatRevenue(amount: number | string): string {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'HUF',
      maximumFractionDigits: 0,
    }).format(num || 0);
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('hu-HU', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  }

  getUserFullName(user: AdminUser): string {
    const full = `${user.last_name} ${user.first_name}`.trim();
    return full || user.email;
  }

  getUserInitial(user: AdminUser): string {
    return (user.last_name || user.first_name || user.email).charAt(0).toUpperCase();
  }

  getAccountStateClass(state: string): string {
    const map: Record<string, string> = {
      admin: 'role-admin',
      verified: 'role-pharmacist',
      unverified: 'role-user',
      banned: 'role-banned',
      deleted: 'role-deleted',
    };
    return map[state] ?? 'role-user';
  }

  getOrderAddressSummary(order: AdminOrder): string {
    const parts = [order.city, order.house_number].filter(Boolean);
    return parts.join(', ') || '—';
  }

  trackById(_index: number, item: { id: string }): string {
    return item.id;
  }

  trackByProductId(_index: number, item: ProductWithHelpers): string {
    return item.id;
  }
}
