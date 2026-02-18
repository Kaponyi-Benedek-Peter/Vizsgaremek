import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';

type AdminSection = 'dashboard' | 'orders' | 'users' | 'products';

interface NavItem {
  id: AdminSection;
  icon: string;
  label: string;
}

interface Order {
  id: string;
  customer: string;
  date: string;
  items: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'pharmacist' | 'user';
  registered: string;
  orders: number;
}

interface AdminProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  active: boolean;
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
  private router = inject(Router);

  activeSection = signal<AdminSection>('dashboard');
  sidebarCollapsed = signal(false);

  orderSearch = '';
  orderStatusFilter = 'all';
  userSearch = '';
  productSearch = '';

  adminName = computed(() => {
    const user = this.authService.currentUser();
    return user ? `${user.firstname} ${user.lastname}`.trim() : 'Admin';
  });

  navItems: NavItem[] = [
    { id: 'dashboard', icon: '📊', label: 'admin.nav.dashboard' },
    { id: 'orders', icon: '📦', label: 'admin.nav.orders' },
    { id: 'users', icon: '👥', label: 'admin.nav.users' },
    { id: 'products', icon: '🏷️', label: 'admin.nav.products' },
  ];

  stats = {
    totalOrders: 248,
    revenue: 1_840_500,
    totalUsers: 1_203,
    totalProducts: 86,
    lowStock: 7,
  };

  recentOrders: Order[] = [
    {
      id: '1042',
      customer: 'Kovács Anna',
      date: '2025. jan. 15.',
      items: 3,
      total: 12500,
      status: 'delivered',
    },
    {
      id: '1041',
      customer: 'Nagy Péter',
      date: '2025. jan. 15.',
      items: 1,
      total: 4200,
      status: 'shipped',
    },
    {
      id: '1040',
      customer: 'Kiss Mária',
      date: '2025. jan. 14.',
      items: 5,
      total: 28900,
      status: 'processing',
    },
    {
      id: '1039',
      customer: 'Szabó István',
      date: '2025. jan. 14.',
      items: 2,
      total: 7600,
      status: 'pending',
    },
    {
      id: '1038',
      customer: 'Fekete Zoltán',
      date: '2025. jan. 13.',
      items: 4,
      total: 15300,
      status: 'cancelled',
    },
    {
      id: '1037',
      customer: 'Tóth Éva',
      date: '2025. jan. 13.',
      items: 2,
      total: 9800,
      status: 'delivered',
    },
    {
      id: '1036',
      customer: 'Varga László',
      date: '2025. jan. 12.',
      items: 1,
      total: 3500,
      status: 'delivered',
    },
  ];

  mockUsers: AdminUser[] = [
    {
      id: '1',
      name: 'Dr. Nagy Katalin',
      email: 'nagy.katalin@roys.hu',
      role: 'pharmacist',
      registered: '2024. márc. 1.',
      orders: 0,
    },
    {
      id: '2',
      name: 'Roy Admin',
      email: 'admin@roys.hu',
      role: 'admin',
      registered: '2024. jan. 1.',
      orders: 0,
    },
    {
      id: '3',
      name: 'Kovács Anna',
      email: 'kovacs.anna@example.hu',
      role: 'user',
      registered: '2024. nov. 15.',
      orders: 5,
    },
    {
      id: '4',
      name: 'Dr. Szabó Péter',
      email: 'szabo.peter@roys.hu',
      role: 'pharmacist',
      registered: '2024. márc. 1.',
      orders: 0,
    },
    {
      id: '5',
      name: 'Kiss Mária',
      email: 'kiss.maria@example.hu',
      role: 'user',
      registered: '2024. dec. 3.',
      orders: 3,
    },
    {
      id: '6',
      name: 'Nagy Péter',
      email: 'nagy.peter@example.hu',
      role: 'user',
      registered: '2025. jan. 10.',
      orders: 1,
    },
  ];

  mockProducts: AdminProduct[] = [
    {
      id: '1',
      name: 'Vitamin C 1000mg',
      category: 'Vitaminok',
      price: 3490,
      stock: 142,
      active: true,
    },
    {
      id: '2',
      name: 'D3-vitamin 2000NE',
      category: 'Vitaminok',
      price: 2990,
      stock: 87,
      active: true,
    },
    {
      id: '3',
      name: 'Ibuprofén 400mg',
      category: 'Fájdalomcsillapítók',
      price: 1290,
      stock: 6,
      active: true,
    },
    {
      id: '4',
      name: 'Probiotikum komplex',
      category: 'Étrend-kiegészítők',
      price: 5490,
      stock: 34,
      active: true,
    },
    {
      id: '5',
      name: 'Omega-3 halolaj',
      category: 'Étrend-kiegészítők',
      price: 4290,
      stock: 4,
      active: false,
    },
    {
      id: '6',
      name: 'Magnézium 375mg',
      category: 'Ásványi anyagok',
      price: 2790,
      stock: 56,
      active: true,
    },
  ];

  filteredOrders = computed(() => {
    let orders = this.recentOrders;
    if (this.orderSearch) {
      const q = this.orderSearch.toLowerCase();
      orders = orders.filter((o) => o.customer.toLowerCase().includes(q) || o.id.includes(q));
    }
    if (this.orderStatusFilter !== 'all') {
      orders = orders.filter((o) => o.status === this.orderStatusFilter);
    }
    return orders;
  });

  filteredUsers = computed(() => {
    if (!this.userSearch) return this.mockUsers;
    const q = this.userSearch.toLowerCase();
    return this.mockUsers.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
    );
  });

  filteredProducts = computed(() => {
    if (!this.productSearch) return this.mockProducts;
    const q = this.productSearch.toLowerCase();
    return this.mockProducts.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
    );
  });

  currentSectionLabel = computed(() => {
    const item = this.navItems.find((n) => n.id === this.activeSection());
    return item?.label || 'admin.nav.dashboard';
  });

  isDevMode = signal(false);

  async ngOnInit(): Promise<void> {
    if (!this.authService.isAuthenticated()) {
      // Try dev admin login (only works when backend is unavailable)
      const devLoginSuccess = await this.authService.devAdminLogin();
      if (devLoginSuccess) {
        this.isDevMode.set(true);
        return;
      }
      // Backend is available but user is not authenticated — redirect to login
      this.router.navigate(['/login']);
      return;
    }

    // Already authenticated — check if it's a dev session
    if (this.authService.isDevAdminSession()) {
      this.isDevMode.set(true);
    }
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

  formatRevenue(amount: number): string {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'HUF',
      maximumFractionDigits: 0,
    }).format(amount);
  }
}
