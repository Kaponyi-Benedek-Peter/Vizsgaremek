import { Component, HostListener, signal, computed, inject, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import {
  AccountService,
  AdminUser,
  AdminOrder,
  OrderProductDetail,
} from '../../core/services/account.service';
import { ProductService } from '../../core/services/product.service';
import { ForumService } from '../../core/services/forum.service';
import { ToastService } from '../../core/services/toast.service';
import { ProductWithHelpers } from '../../core/models/product.model';
import { ProductImage } from '../../core/models/product.model';
import { Post } from '../../core/models/forum.model';
import { ICONS } from '../../core/constants/visuals';
import { ResizableTableDirective } from '../../shared/directives/resizable-table.directive';
import { formatFileSize } from '../../core/utils/image-utils';
import { MOCK_MODE, MOCK_USERS, MOCK_ORDERS, MOCK_POSTS } from './admin.mock';
import { PdfExportService } from '../../core/services/pdf-export.service';

import {
  AdminSection,
  NavItem,
  ImageMeta,
  GalleryImage,
  ProductFormTab,
  ProductFormData,
  PostFormTab,
  PostFormData,
  UserActionType,
  UserActionRequest,
  ACCOUNT_STATES,
  ADMIN_ASSIGNABLE_STATES,
  SUPERADMIN_ASSIGNABLE_STATES,
  ORDER_COLUMNS,
  USER_COLUMNS,
  PRODUCT_COLUMNS,
  POST_COLUMNS,
} from '../../core/models/admin.models';
import {
  emptyProductForm,
  emptyPostForm,
  generateSlug,
  smartFilter,
} from '../../core/utils/admin.utils';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule, FormsModule, TranslateModule, ResizableTableDirective],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  private productService = inject(ProductService);
  private forumService = inject(ForumService);
  private toastService = inject(ToastService);
  private translate = inject(TranslateService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private pdfService = inject(PdfExportService);

  protected readonly icons = ICONS;
  protected readonly ACCOUNT_STATES = ACCOUNT_STATES;

  activeSection = signal<AdminSection>('dashboard');
  sidebarCollapsed = signal(false);

  isMobileView = signal(typeof window !== 'undefined' && window.innerWidth <= 768);

  showNavLabels = computed(() =>
    this.isMobileView() ? this.sidebarCollapsed() : !this.sidebarCollapsed(),
  );

  mobileOverlayActive = computed(() => this.isMobileView() && this.sidebarCollapsed());

  @HostListener('window:resize')
  onResize(): void {
    this.isMobileView.set(window.innerWidth <= 768);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-actions-wrapper')) {
      this.activeUserMenu.set(null);
    }
  }

  orderSearch = '';
  orderStatusFilter = 'all';
  userSearch = '';
  productSearch = '';
  postSearch = '';

  usersLoading = signal(false);
  usersError = signal<string | null>(null);
  ordersLoading = signal(false);
  ordersError = signal<string | null>(null);
  productsLoading = signal(false);
  productsError = signal<string | null>(null);
  postsLoading = signal(false);
  postsError = signal<string | null>(null);

  apiUsers = signal<AdminUser[]>([]);
  apiOrders = signal<AdminOrder[]>([]);
  apiPosts = signal<Post[]>([]);

  galleryOpen = signal(false);
  galleryProduct = signal<ProductWithHelpers | null>(null);
  galleryImages = signal<GalleryImage[]>([]);
  galleryLoading = signal(false);
  uploadTransparent = signal(false);
  uploadInProgress = signal(false);

  detailOpen = signal(false);
  detailImage = signal<GalleryImage | null>(null);
  detailMeta = signal<ImageMeta | null>(null);
  detailNaturalWidth = signal(0);
  detailNaturalHeight = signal(0);

  deleteConfirmOpen = signal(false);
  deleteTargetImage = signal<GalleryImage | null>(null);

  postGalleryOpen = signal(false);
  postGalleryPost = signal<Post | null>(null);
  postGalleryImages = signal<GalleryImage[]>([]);
  postGalleryLoading = signal(false);
  postUploadInProgress = signal(false);

  postImageDetailOpen = signal(false);
  postImageDetailImage = signal<GalleryImage | null>(null);
  postImageDetailMeta = signal<ImageMeta | null>(null);
  postImageDetailNaturalWidth = signal(0);
  postImageDetailNaturalHeight = signal(0);

  postDeleteImageConfirmOpen = signal(false);
  postDeleteTargetImage = signal<GalleryImage | null>(null);

  copiedImageUrl = signal<string | null>(null);

  activeUserMenu = signal<string | null>(null);
  userActionConfirm = signal<UserActionRequest | null>(null);
  userActionLoading = signal(false);

  productFormOpen = signal(false);
  productFormTab = signal<ProductFormTab>('basic');
  productFormData = signal<ProductFormData>(emptyProductForm());
  productFormEditId = signal<string | null>(null);
  productFormSaving = signal(false);
  productDeleteConfirm = signal<ProductWithHelpers | null>(null);
  productDeleteLoading = signal(false);
  orderCancelConfirm = signal<AdminOrder | null>(null);
  orderActionLoading = signal(false);

  orderDetailOpen = signal(false);
  orderDetailOrder = signal<AdminOrder | null>(null);

  postFormOpen = signal(false);
  postFormTab = signal<PostFormTab>('basic');
  postFormData = signal<PostFormData>(emptyPostForm());
  postFormEditId = signal<string | null>(null);
  postFormSaving = signal(false);
  postDeleteConfirm = signal<Post | null>(null);
  postDeleteLoading = signal(false);

  productFormIsEdit = computed(() => this.productFormEditId() !== null);
  postFormIsEdit = computed(() => this.postFormEditId() !== null);

  availableCategories = computed(() => this.productService.categories());
  availablePostCategories = computed(() => this.forumService.categories());

  adminName = computed(() => {
    const user = this.authService.currentUser();
    return user ? `${user.firstname} ${user.lastname}`.trim() : 'Admin';
  });

  currentAdminId = computed(() => {
    return this.authService.currentUser()?.id ?? '';
  });

  stats = computed(() => {
    const orders = this.apiOrders();
    const users = this.apiUsers();
    const products = this.productService.products();

    const totalRevenue = orders.reduce((sum, o) => sum + (parseFloat(o.price) || 0), 0);
    const lowStock = products.filter((p) => p.stock_number > 0 && p.stock_number < 10).length;

    return {
      totalOrders: orders.length,
      revenue: totalRevenue,
      totalUsers: users.length,
      totalProducts: products.length,
      lowStock,
    };
  });

  navItems: NavItem[] = [
    { id: 'dashboard', icon: ICONS.reports, label: 'admin.nav.dashboard' },
    { id: 'orders', icon: ICONS.order, label: 'admin.nav.orders' },
    { id: 'users', icon: ICONS.customers, label: 'admin.nav.users' },
    { id: 'products', icon: ICONS.sale, label: 'admin.nav.products' },
    { id: 'posts', icon: ICONS.forumNewPost, label: 'admin.nav.posts' },
  ];

  productFormTabs: { id: ProductFormTab; label: string }[] = [
    { id: 'basic', label: 'admin.product_form.tab_basic' },
    { id: 'pricing', label: 'admin.product_form.tab_pricing' },
    { id: 'descriptions', label: 'admin.product_form.tab_descriptions' },
    { id: 'details', label: 'admin.product_form.tab_details' },
  ];

  postFormTabs: { id: PostFormTab; label: string }[] = [
    { id: 'basic', label: 'admin.posts_form.tab_basic' },
    { id: 'content', label: 'admin.posts_form.tab_content' },
    { id: 'images', label: 'admin.posts_form.tab_images' },
  ];

  filteredOrders = computed(() => {
    return smartFilter(this.apiOrders(), this.orderSearch, ORDER_COLUMNS);
  });

  filteredUsers = computed(() => {
    return smartFilter(this.apiUsers(), this.userSearch, USER_COLUMNS);
  });

  filteredProducts = computed(() => {
    return smartFilter(this.productService.products(), this.productSearch, PRODUCT_COLUMNS);
  });

  filteredPosts = computed(() => {
    return smartFilter(this.apiPosts(), this.postSearch, POST_COLUMNS);
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
    this.loadPostsForAdmin();

    this.route.queryParams.subscribe((params) => {
      if (params['section'] === 'posts') {
        this.activeSection.set('posts');
        if (params['action'] === 'new') {
          // Kis delay, hogy az oldal betöltsön
          setTimeout(() => this.openPostForm(), 100);
        }
      }
    });
  }

  loadUsers(): void {
    if (MOCK_MODE) {
      this.apiUsers.set(MOCK_USERS);
      return;
    }

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
    if (MOCK_MODE) {
      this.apiOrders.set(MOCK_ORDERS);
      return;
    }

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

  loadPostsForAdmin(): void {
    if (MOCK_MODE) {
      this.apiPosts.set(MOCK_POSTS);
      return;
    }

    this.postsLoading.set(true);
    this.postsError.set(null);
    this.forumService
      .getAllPostsAdmin(
        this.currentAdminId(),
        this.authService.getSessionToken() ?? this.authService.getToken() ?? '',
      )
      .subscribe({
        next: (posts) => {
          this.apiPosts.set(posts);
          this.postsLoading.set(false);
        },
        error: () => {
          // Fallback: public endpoint
          this.apiPosts.set(this.forumService.posts());
          this.postsError.set('admin.errors.posts_load_failed');
          this.postsLoading.set(false);
        },
      });
  }

  setSection(section: AdminSection): void {
    this.activeSection.set(section);
    this.closeMobileSidebar();
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.update((v) => !v);
  }

  closeMobileSidebar(): void {
    if (this.isMobileView()) {
      this.sidebarCollapsed.set(false);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openOrderDetail(order: AdminOrder): void {
    this.orderDetailOrder.set(order);
    this.orderDetailOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeOrderDetail(): void {
    this.orderDetailOpen.set(false);
    this.orderDetailOrder.set(null);
    document.body.style.overflow = '';
  }

  exportOrdersPdf(): void {
    const headers = ['ID', 'Email', 'Billing', 'City', 'Price', 'Status', 'Date'];
    const rows = this.filteredOrders().map((o) => [
      '#' + o.id,
      o.email || '—',
      o.billing_name || '—',
      o.city || '—',
      this.formatRevenue(o.price),
      o.order_status,
      this.formatDate(o.created_at),
    ]);
    this.pdfService.exportTable(
      'Orders Report',
      headers,
      rows,
      `orders-report-${new Date().toISOString().slice(0, 10)}.pdf`,
    );
  }

  exportUsersPdf(): void {
    const headers = ['ID', 'Name', 'Email', 'Role', 'Registered'];
    const rows = this.filteredUsers().map((u) => [
      '#' + u.id,
      this.getUserFullName(u),
      u.email,
      u.account_state,
      this.formatDate(u.created_at),
    ]);
    this.pdfService.exportTable(
      'Users Report',
      headers,
      rows,
      `users-report-${new Date().toISOString().slice(0, 10)}.pdf`,
    );
  }

  exportProductsPdf(): void {
    const headers = ['ID', 'Name', 'Brand', 'Category', 'Price', 'Stock', 'SKU'];
    const rows = this.filteredProducts().map((p) => [
      '#' + p.id,
      p.name || '—',
      p.brand || '—',
      p.category || '—',
      this.formatRevenue(p.price_number || 0),
      String(p.stock_number ?? 0),
      p.sku || '—',
    ]);
    this.pdfService.exportTable(
      'Products Report',
      headers,
      rows,
      `products-report-${new Date().toISOString().slice(0, 10)}.pdf`,
    );
  }

  exportDashboardPdf(): void {
    const s = this.stats();
    const stats = [
      { label: 'Total Orders', value: s.totalOrders },
      { label: 'Revenue', value: this.formatRevenue(s.revenue) },
      { label: 'Total Users', value: s.totalUsers },
      { label: 'Total Products', value: s.totalProducts },
      { label: 'Low Stock Items', value: s.lowStock },
    ];
    const recentHeaders = ['ID', 'Email', 'Address', 'Price', 'Status'];
    const recentRows = this.recentOrders().map((o) => [
      '#' + o.id,
      o.email || '—',
      this.getOrderAddressSummary(o),
      this.formatRevenue(o.price),
      o.order_status,
    ]);
    this.pdfService.exportDashboardStats(
      stats,
      { headers: recentHeaders, rows: recentRows },
      `dashboard-report-${new Date().toISOString().slice(0, 10)}.pdf`,
    );
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

  getProductName(product: OrderProductDetail): string {
    const lang = this.translate.currentLang || 'en';
    if (lang === 'hu' && product.product_name_hu) return product.product_name_hu;
    if (lang === 'de' && product.product_name_de) return product.product_name_de;
    return product.product_name_en || product.product_name_hu || '—';
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
      superadmin: 'role-admin',
      verified: 'role-pharmacist',
      unverified: 'role-user',
      banned: 'role-banned',
      deleted: 'role-deleted',
    };
    return map[state] ?? 'role-user';
  }

  getOrderStatusClass(status: string): string {
    const map: Record<string, string> = {
      pending: 'status-pending',
      processing: 'status-processing',
      shipped: 'status-shipped',
      delivered: 'status-delivered',
      cancelled: 'status-cancelled',
    };
    return 'status-badge ' + (map[status] ?? 'status-pending');
  }

  getPostStatusClass(status: string): string {
    const map: Record<string, string> = {
      published: 'post-status-published',
      draft: 'post-status-draft',
      archived: 'post-status-archived',
      hidden: 'post-status-hidden',
    };
    return 'post-status-badge ' + (map[status] ?? 'post-status-draft');
  }

  getOrderAddressSummary(order: AdminOrder): string {
    const parts = [
      order.city,
      order.zipcode ? `(${order.zipcode})` : null,
      order.address,
      order.house_number,
      order.apartment_number ? `/${order.apartment_number}` : null,
    ].filter(Boolean);
    return parts.join(' ') || '—';
  }

  getProductImageCount(product: ProductWithHelpers): number {
    const count = product.images?.length ?? 0;
    return count > 0 ? count : product.thumbnail_url ? 1 : 0;
  }

  trackById(_index: number, item: { id: string }): string {
    return item.id;
  }

  trackByProductId(_index: number, item: ProductWithHelpers): string {
    return item.id;
  }

  isSelf(user: AdminUser): boolean {
    return user.id === this.currentAdminId();
  }

  canManageUser(user: AdminUser): boolean {
    if (this.isSelf(user)) return false;

    const myRole = this.authService.authState().role;
    const targetRole = user.account_state;

    if (myRole === 'superadmin') return true;
    if (myRole === 'admin') {
      return targetRole !== 'admin' && targetRole !== 'superadmin';
    }
    return false;
  }

  updateOrderStatus(order: AdminOrder, newStatus: string): void {
    if (MOCK_MODE) {
      this.apiOrders.update((orders) =>
        orders.map((o) =>
          o.id === order.id ? { ...o, order_status: newStatus as AdminOrder['order_status'] } : o,
        ),
      );
      this.toastService.show('admin.order_actions.status_updated', 'success');
      return;
    }

    this.orderActionLoading.set(true);

    this.accountService.updateOrderStatusAdmin(order.id, newStatus).subscribe({
      next: (res) => {
        if (res.statuscode === '200') {
          this.apiOrders.update((orders) =>
            orders.map((o) =>
              o.id === order.id
                ? { ...o, order_status: newStatus as AdminOrder['order_status'] }
                : o,
            ),
          );
          this.toastService.show('admin.order_actions.status_updated', 'success');
        } else {
          this.toastService.show('admin.order_actions.error', 'error');
          this.loadOrders();
        }
        this.orderActionLoading.set(false);
      },
      error: () => {
        this.toastService.show('admin.order_actions.error', 'error');
        this.loadOrders();
        this.orderActionLoading.set(false);
      },
    });
  }

  requestCancelOrder(order: AdminOrder): void {
    this.orderCancelConfirm.set(order);
  }

  cancelCancelOrder(): void {
    this.orderCancelConfirm.set(null);
  }

  confirmCancelOrder(): void {
    const order = this.orderCancelConfirm();
    if (!order) return;
    this.orderCancelConfirm.set(null);
    this.updateOrderStatus(order, 'cancelled');
  }

  toggleUserMenu(userId: string, event: MouseEvent): void {
    event.stopPropagation();
    this.activeUserMenu.update((current) => (current === userId ? null : userId));
  }

  getAvailableStates(user: AdminUser): string[] {
    const myRole = this.authService.authState().role;
    const assignable =
      myRole === 'superadmin' ? SUPERADMIN_ASSIGNABLE_STATES : ADMIN_ASSIGNABLE_STATES;
    return [...assignable].filter((s) => s !== user.account_state);
  }

  requestChangeRole(user: AdminUser, newState: string): void {
    this.activeUserMenu.set(null);
    this.userActionConfirm.set({ user, action: 'change_role', newState });
  }

  requestBanUser(user: AdminUser): void {
    this.activeUserMenu.set(null);
    this.userActionConfirm.set({ user, action: 'ban' });
  }

  requestUnbanUser(user: AdminUser): void {
    this.activeUserMenu.set(null);
    this.userActionConfirm.set({ user, action: 'unban', newState: 'verified' });
  }

  requestDeleteUser(user: AdminUser): void {
    this.activeUserMenu.set(null);
    this.userActionConfirm.set({ user, action: 'delete' });
  }

  cancelUserAction(): void {
    this.userActionConfirm.set(null);
  }

  confirmUserAction(): void {
    const req = this.userActionConfirm();
    if (!req) return;

    this.userActionLoading.set(true);

    if (MOCK_MODE) {
      this.executeMockUserAction(req);
      return;
    }

    const adminId = this.currentAdminId();
    const token = this.authService.getSessionToken() ?? this.authService.getToken() ?? '';

    switch (req.action) {
      case 'change_role':
      case 'unban':
        this.accountService
          .updateUserStateAdmin(adminId, token, req.user.id, req.newState!, '')
          .subscribe({
            next: (res) => {
              if (res.statuscode === '200') {
                this.applyUserStateChange(req.user.id, req.newState!);
                this.toastService.show('admin.user_actions.success', 'success');
              } else {
                this.toastService.show('admin.user_actions.error', 'error');
              }
              this.finishUserAction();
            },
            error: () => {
              this.toastService.show('admin.user_actions.error', 'error');
              this.finishUserAction();
            },
          });
        break;

      case 'ban':
        this.accountService
          .updateUserStateAdmin(adminId, token, req.user.id, 'banned', '')
          .subscribe({
            next: (res) => {
              if (res.statuscode === '200') {
                this.applyUserStateChange(req.user.id, 'banned');
                this.toastService.show('admin.user_actions.banned', 'success');
              } else {
                this.toastService.show('admin.user_actions.error', 'error');
              }
              this.finishUserAction();
            },
            error: () => {
              this.toastService.show('admin.user_actions.error', 'error');
              this.finishUserAction();
            },
          });
        break;

      case 'delete':
        this.accountService.deleteUserAdmin(req.user.id).subscribe({
          next: (res) => {
            if (res.statuscode === '200') {
              this.apiUsers.update((users) => users.filter((u) => u.id !== req.user.id));
              this.toastService.show('admin.user_actions.deleted', 'success');
            } else {
              this.toastService.show('admin.user_actions.error', 'error');
            }
            this.finishUserAction();
          },
          error: () => {
            this.toastService.show('admin.user_actions.error', 'error');
            this.finishUserAction();
          },
        });
        break;
    }
  }

  getUserActionTitle(): string {
    const req = this.userActionConfirm();
    if (!req) return '';
    switch (req.action) {
      case 'change_role':
        return 'admin.user_actions.confirm_role_title';
      case 'ban':
        return 'admin.user_actions.confirm_ban_title';
      case 'unban':
        return 'admin.user_actions.confirm_unban_title';
      case 'delete':
        return 'admin.user_actions.confirm_delete_title';
    }
  }

  getUserActionText(): string {
    const req = this.userActionConfirm();
    if (!req) return '';
    switch (req.action) {
      case 'change_role':
        return 'admin.user_actions.confirm_role_text';
      case 'ban':
        return 'admin.user_actions.confirm_ban_text';
      case 'unban':
        return 'admin.user_actions.confirm_unban_text';
      case 'delete':
        return 'admin.user_actions.confirm_delete_text';
    }
  }

  getUserActionBtnClass(): string {
    const req = this.userActionConfirm();
    if (!req) return '';
    return req.action === 'delete' || req.action === 'ban'
      ? 'confirm-delete-btn'
      : 'confirm-action-btn';
  }

  private executeMockUserAction(req: UserActionRequest): void {
    switch (req.action) {
      case 'change_role':
      case 'unban':
        this.applyUserStateChange(req.user.id, req.newState!);
        break;
      case 'ban':
        this.applyUserStateChange(req.user.id, 'banned');
        break;
      case 'delete':
        this.apiUsers.update((users) => users.filter((u) => u.id !== req.user.id));
        break;
    }
    this.finishUserAction();
  }

  private applyUserStateChange(userId: string, newState: string): void {
    this.apiUsers.update((users) =>
      users.map((u) => (u.id === userId ? { ...u, account_state: newState } : u)),
    );
  }

  private finishUserAction(): void {
    this.userActionLoading.set(false);
    this.userActionConfirm.set(null);
  }

  requestDeleteProduct(product: ProductWithHelpers, event: MouseEvent): void {
    event.stopPropagation();
    this.productDeleteConfirm.set(product);
  }

  cancelDeleteProduct(): void {
    this.productDeleteConfirm.set(null);
  }

  confirmDeleteProduct(): void {
    const product = this.productDeleteConfirm();
    if (!product) return;

    this.productDeleteLoading.set(true);

    if (MOCK_MODE) {
      this.toastService.show('admin.product_form.deleted', 'success');
      this.productDeleteLoading.set(false);
      this.productDeleteConfirm.set(null);
      return;
    }

    const auth = this.buildAdminAuth();

    this.productService.deleteProductAdmin(auth, product.id).subscribe({
      next: (res) => {
        if (res.statuscode === '200') {
          this.toastService.show('admin.product_form.deleted', 'success');
          this.loadProducts();
        } else {
          this.toastService.show('admin.product_form.delete_error', 'error');
        }
        this.productDeleteLoading.set(false);
        this.productDeleteConfirm.set(null);
      },
      error: () => {
        this.toastService.show('admin.product_form.delete_error', 'error');
        this.productDeleteLoading.set(false);
        this.productDeleteConfirm.set(null);
      },
    });
  }

  openProductForm(product?: ProductWithHelpers): void {
    if (product) {
      this.productFormEditId.set(product.id);
      this.productFormData.set({
        name_hu: product.name_hu || '',
        name_en: product.name_en || '',
        name_de: product.name_de || '',
        description_hu: product.description_hu || '',
        description_en: product.description_en || '',
        description_de: product.description_de || '',
        description_preview_hu: product.description_preview_hu || '',
        description_preview_en: product.description_preview_en || '',
        description_preview_de: product.description_preview_de || '',
        price_huf: product.price_number || 0,
        sale_percentage: product.sale_percentage_number || 0,
        stock: product.stock_number || 0,
        category_id: product.category_id || '',
        manufacturer: product.manufacturer || '',
        brand: product.brand || '',
        sku: product.sku || '',
        active_ingredients: product.active_ingredients || '',
        packaging_hu: product.packaging_hu ?? '',
        packaging_en: product.packaging_en ?? '',
        packaging_de: product.packaging_de ?? '',
        thumbnail_url: product.thumbnail_url || '',
        featured: product.is_featured || false,
      });
    } else {
      this.productFormEditId.set(null);
      this.productFormData.set(emptyProductForm());
    }
    this.productFormTab.set('basic');
    this.productFormOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeProductForm(): void {
    this.productFormOpen.set(false);
    this.productFormEditId.set(null);
    this.productFormData.set(emptyProductForm());
    document.body.style.overflow = '';
  }

  onProductFormOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('product-form-overlay')) {
      this.closeProductForm();
    }
  }

  setProductFormTab(tab: ProductFormTab): void {
    this.productFormTab.set(tab);
  }

  updateProductField<K extends keyof ProductFormData>(key: K, value: ProductFormData[K]): void {
    this.productFormData.update((data) => ({ ...data, [key]: value }));
  }

  toggleProductFeatured(): void {
    this.productFormData.update((data) => ({ ...data, featured: !data.featured }));
  }

  saveProduct(): void {
    const data = this.productFormData();
    const editId = this.productFormEditId();

    if (!data.name_en.trim()) {
      this.toastService.show('admin.product_form.error_name_required', 'error');
      this.productFormTab.set('basic');
      return;
    }

    this.productFormSaving.set(true);

    if (MOCK_MODE) {
      this.toastService.show(
        editId ? 'admin.product_form.updated' : 'admin.product_form.created',
        'success',
      );
      this.productFormSaving.set(false);
      this.closeProductForm();
      this.loadProducts();
      return;
    }

    const body = this.buildProductApiBody(data, editId);

    this.productService.saveProductAdmin(body, !!editId).subscribe({
      next: (res) => {
        if (res.statuscode === '200') {
          this.toastService.show(
            editId ? 'admin.product_form.updated' : 'admin.product_form.created',
            'success',
          );
          this.closeProductForm();
          this.loadProducts();
        } else {
          this.toastService.show('admin.product_form.save_error', 'error');
        }
        this.productFormSaving.set(false);
      },
      error: () => {
        this.toastService.show('admin.product_form.save_error', 'error');
        this.productFormSaving.set(false);
      },
    });
  }

  private buildProductApiBody(
    data: ProductFormData,
    editId: string | null,
  ): Record<string, string | number> {
    const auth = this.buildAdminAuth();
    const body: Record<string, string | number> = {
      ...auth,
      name_hu: btoa(data.name_hu),
      name_en: btoa(data.name_en),
      name_de: btoa(data.name_de),
      description_hu: btoa(data.description_hu),
      description_en: btoa(data.description_en),
      description_de: btoa(data.description_de),
      description_preview_hu: btoa(data.description_preview_hu),
      description_preview_en: btoa(data.description_preview_en),
      description_preview_de: btoa(data.description_preview_de),
      price_huf: data.price_huf,
      sale_percentage: data.sale_percentage,
      stock: data.stock,
      category_id: btoa(data.category_id),
      manufacturer: btoa(data.manufacturer),
      brand: btoa(data.brand),
      sku: btoa(data.sku),
      active_ingredients: btoa(data.active_ingredients),
      packaging_hu: btoa(data.packaging_hu),
      packaging_en: btoa(data.packaging_en),
      packaging_de: btoa(data.packaging_de),
      thumbnail_url: btoa(data.thumbnail_url),
      featured: data.featured ? 1 : 0,
    };

    if (editId) {
      body['product_id'] = btoa(editId);
    }

    return body;
  }

  openPostForm(post?: Post): void {
    if (post) {
      this.postFormEditId.set(post.id);
      this.postFormData.set({
        title: post.title || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        image_url: post.image_url || '',
        category_id: post.category_id || '',
        tags: post.tags || '',
        status: (post.status as PostFormData['status']) || 'draft',
        is_featured: !!post.is_featured,
        slug: post.slug || '',
      });
    } else {
      this.postFormEditId.set(null);
      this.postFormData.set(emptyPostForm());
    }
    this.postFormTab.set('basic');
    this.postFormOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closePostForm(): void {
    this.postFormOpen.set(false);
    this.postFormEditId.set(null);
    this.postFormData.set(emptyPostForm());
    document.body.style.overflow = '';
  }

  onPostFormOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('post-form-overlay')) {
      this.closePostForm();
    }
  }

  setPostFormTab(tab: PostFormTab): void {
    this.postFormTab.set(tab);
  }

  updatePostField<K extends keyof PostFormData>(key: K, value: PostFormData[K]): void {
    this.postFormData.update((data) => ({ ...data, [key]: value }));
    if (key === 'title' && !this.postFormIsEdit()) {
      const slug = generateSlug(value as string);
      this.postFormData.update((data) => ({ ...data, slug }));
    }
  }

  togglePostFeatured(): void {
    this.postFormData.update((data) => ({ ...data, is_featured: !data.is_featured }));
  }

  regenerateSlug(): void {
    const title = this.postFormData().title;
    this.postFormData.update((data) => ({ ...data, slug: generateSlug(title) }));
  }

  savePost(): void {
    const data = this.postFormData();
    const editId = this.postFormEditId();

    if (!data.title.trim()) {
      this.toastService.show('admin.posts_form.error_title_required', 'error');
      this.postFormTab.set('basic');
      return;
    }

    this.postFormSaving.set(true);

    if (MOCK_MODE) {
      if (editId) {
        this.apiPosts.update((posts) =>
          posts.map((p) =>
            p.id === editId
              ? {
                  ...p,
                  title: data.title,
                  excerpt: data.excerpt,
                  content: data.content,
                  image_url: data.image_url,
                  category_id: data.category_id,
                  tags: data.tags,
                  status: data.status,
                  is_featured: data.is_featured ? 1 : 0,
                  slug: data.slug,
                  updated_at: new Date().toISOString(),
                }
              : p,
          ),
        );
      } else {
        const newPost: Post = {
          id: String(Date.now()),
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          image_url: data.image_url,
          category_id: data.category_id,
          tags: data.tags,
          status: data.status,
          is_featured: data.is_featured ? 1 : 0,
          slug: data.slug,
          user_id: this.currentAdminId(),
          views: 0,
          likes: 0,
          comment_count: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          published_at: data.status === 'published' ? new Date().toISOString() : undefined,
        };
        this.apiPosts.update((posts) => [newPost, ...posts]);
      }
      this.toastService.show(
        editId ? 'admin.posts_form.updated' : 'admin.posts_form.created',
        'success',
      );
      this.postFormSaving.set(false);
      this.closePostForm();
      return;
    }

    const adminId = this.currentAdminId();
    const token = this.authService.getSessionToken() ?? this.authService.getToken() ?? '';

    const payload = {
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      slug: data.slug,
      image_url: data.image_url,
      category_id: data.category_id,
      tags: data.tags,
      status: data.status,
      is_featured: data.is_featured,
      // Update esetén megőrizzük az eredeti views/likes/comment_count értékeket
      views: editId ? (this.apiPosts().find((p) => p.id === editId)?.views ?? 0) : 0,
      likes: editId ? (this.apiPosts().find((p) => p.id === editId)?.likes ?? 0) : 0,
      comment_count: editId
        ? (this.apiPosts().find((p) => p.id === editId)?.comment_count ?? 0)
        : 0,
    };

    const request$ = editId
      ? this.forumService.updatePostAdmin(adminId, token, editId, payload)
      : this.forumService.createPostAdmin(adminId, token, payload);

    request$.subscribe({
      next: (res) => {
        if (res.statuscode === 200 || res.statuscode.toString() === '200') {
          this.toastService.show(
            editId ? 'admin.posts_form.updated' : 'admin.posts_form.created',
            'success',
          );
          this.closePostForm();
          this.loadPostsForAdmin();
        } else {
          this.toastService.show('admin.posts_form.save_error', 'error');
        }
        this.postFormSaving.set(false);
      },
      error: () => {
        this.toastService.show('admin.posts_form.save_error', 'error');
        this.postFormSaving.set(false);
      },
    });
  }

  requestDeletePost(post: Post, event: MouseEvent): void {
    event.stopPropagation();
    this.postDeleteConfirm.set(post);
  }

  cancelDeletePost(): void {
    this.postDeleteConfirm.set(null);
  }

  confirmDeletePost(): void {
    const post = this.postDeleteConfirm();
    if (!post) return;

    this.postDeleteLoading.set(true);

    if (MOCK_MODE) {
      this.apiPosts.update((posts) => posts.filter((p) => p.id !== post.id));
      this.toastService.show('admin.posts_form.deleted', 'success');
      this.postDeleteLoading.set(false);
      this.postDeleteConfirm.set(null);
      return;
    }

    const adminId = this.currentAdminId();
    const token = this.authService.getSessionToken() ?? this.authService.getToken() ?? '';

    this.forumService.deletePostAdmin(adminId, token, post.id).subscribe({
      next: (res) => {
        if (res.statuscode === 200 || res.statuscode.toString() === '200') {
          this.apiPosts.update((posts) => posts.filter((p) => p.id !== post.id));
          this.toastService.show('admin.posts_form.deleted', 'success');
        } else {
          this.toastService.show('admin.posts_form.delete_error', 'error');
        }
        this.postDeleteLoading.set(false);
        this.postDeleteConfirm.set(null);
      },
      error: () => {
        this.toastService.show('admin.posts_form.delete_error', 'error');
        this.postDeleteLoading.set(false);
        this.postDeleteConfirm.set(null);
      },
    });
  }

  openPostGallery(post: Post): void {
    this.postGalleryPost.set(post);
    this.postGalleryImages.set([]);
    this.postGalleryOpen.set(true);
    this.postGalleryLoading.set(true);
    document.body.style.overflow = 'hidden';

    if (MOCK_MODE) {
      const mockImages: GalleryImage[] = [];
      if (post.image_url) {
        mockImages.push({
          id: 'mock-cover',
          product_id: post.id,
          image_url: post.image_url,
          alt_text_hu: post.title,
          alt_text_en: post.title,
          alt_text_de: post.title,
          sort_id: '1',
        });
      }
      this.postGalleryImages.set(mockImages);
      this.postGalleryLoading.set(false);
      return;
    }

    const adminId = this.currentAdminId();
    const token = this.authService.getSessionToken() ?? this.authService.getToken() ?? '';

    this.forumService.getPostImagesAdmin(adminId, token, post.id).subscribe({
      next: (images) => {
        this.postGalleryImages.set(images);
        this.postGalleryLoading.set(false);
      },
      error: () => {
        this.postGalleryLoading.set(false);
      },
    });
  }

  closePostGallery(): void {
    this.postGalleryImages().forEach((img) => {
      if (img.objectUrl) URL.revokeObjectURL(img.objectUrl);
    });
    this.postGalleryOpen.set(false);
    this.postGalleryPost.set(null);
    this.postGalleryImages.set([]);
    if (!this.postImageDetailOpen()) {
      document.body.style.overflow = '';
    }
  }

  onPostGalleryOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('gallery-overlay')) {
      this.closePostGallery();
    }
  }

  triggerPostFileUpload(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = (e: Event) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) this.handlePostFileUpload(files);
    };
    input.click();
  }

  private async handlePostFileUpload(files: FileList): Promise<void> {
    const post = this.postGalleryPost();
    if (!post) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const objectUrl = URL.createObjectURL(file);

      const img = new Image();
      const dims = await new Promise<{ w: number; h: number }>((resolve) => {
        img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
        img.onerror = () => resolve({ w: 0, h: 0 });
        img.src = objectUrl;
      });

      const newImage: GalleryImage = {
        id: `new-${Date.now()}-${i}`,
        product_id: post.id,
        image_url: objectUrl,
        alt_text_hu: file.name,
        alt_text_en: file.name,
        alt_text_de: file.name,
        sort_id: `${this.postGalleryImages().length + 1}`,
        file,
        objectUrl,
        meta: {
          name: file.name,
          size: formatFileSize(file.size),
          type: file.type || 'unknown',
          width: dims.w,
          height: dims.h,
          resolution: dims.w > 0 ? `${dims.w} × ${dims.h}` : '—',
          lastModified: new Date(file.lastModified).toLocaleDateString('hu-HU'),
        },
      };

      this.postGalleryImages.update((imgs) => [...imgs, newImage]);

      if (!MOCK_MODE) {
        this.uploadPostImageToBackend(post.id, file, newImage.id);
      }
    }
  }

  private uploadPostImageToBackend(postId: string, file: File, tempId: string): void {
    this.postUploadInProgress.set(true);
    const adminId = this.currentAdminId();
    const token = this.authService.getSessionToken() ?? this.authService.getToken() ?? '';

    const reader = new FileReader();
    reader.onload = () => {
      const imageBase64 = reader.result as string;

      this.forumService.uploadPostImageAdmin(adminId, token, postId, imageBase64).subscribe({
        next: (res) => {
          if (res.statuscode === '200' && 'image' in res) {
            const uploaded = (res as { statuscode: string; status: string; image: GalleryImage })
              .image;
            if (uploaded) {
              this.postGalleryImages.update((imgs) =>
                imgs.map((img) =>
                  img.id === tempId
                    ? { ...img, id: uploaded.id, image_url: uploaded.image_url, file: undefined }
                    : img,
                ),
              );
            }
          }
          this.postUploadInProgress.set(false);
        },
        error: () => {
          this.postUploadInProgress.set(false);
        },
      });
    };
    reader.onerror = () => {
      this.postUploadInProgress.set(false);
    };
    reader.readAsDataURL(file);
  }

  copyImageUrl(url: string): void {
    navigator.clipboard.writeText(url).then(() => {
      this.copiedImageUrl.set(url);
      setTimeout(() => this.copiedImageUrl.set(null), 2000);
    });
  }

  requestDeletePostImage(image: GalleryImage, event: MouseEvent): void {
    event.stopPropagation();
    this.postDeleteTargetImage.set(image);
    this.postDeleteImageConfirmOpen.set(true);
  }

  confirmDeletePostImage(): void {
    const target = this.postDeleteTargetImage();
    const post = this.postGalleryPost();
    if (!target || !post) return;

    if (target.id.startsWith('new-')) {
      if (target.objectUrl) URL.revokeObjectURL(target.objectUrl);
      this.postGalleryImages.update((imgs) => imgs.filter((img) => img.id !== target.id));
      this.cancelDeletePostImage();
      return;
    }

    if (MOCK_MODE) {
      this.postGalleryImages.update((imgs) => imgs.filter((img) => img.id !== target.id));
      this.toastService.show('admin.gallery.image_deleted', 'success');
      this.cancelDeletePostImage();
      return;
    }

    const adminId = this.currentAdminId();
    const token = this.authService.getSessionToken() ?? this.authService.getToken() ?? '';

    this.forumService.deletePostImageAdmin(adminId, token, post.id, target.id).subscribe({
      next: (res) => {
        if (res.statuscode === '200') {
          if (target.objectUrl) URL.revokeObjectURL(target.objectUrl);
          this.postGalleryImages.update((imgs) => imgs.filter((img) => img.id !== target.id));
          this.toastService.show('admin.gallery.image_deleted', 'success');
        } else {
          this.toastService.show('admin.gallery.delete_error', 'error');
        }
        this.cancelDeletePostImage();
      },
      error: () => {
        this.toastService.show('admin.gallery.delete_error', 'error');
        this.cancelDeletePostImage();
      },
    });
  }

  cancelDeletePostImage(): void {
    this.postDeleteImageConfirmOpen.set(false);
    this.postDeleteTargetImage.set(null);
  }

  openPostImageDetail(image: GalleryImage): void {
    this.postImageDetailImage.set(image);
    this.postImageDetailNaturalWidth.set(0);
    this.postImageDetailNaturalHeight.set(0);

    if (image.meta) {
      this.postImageDetailMeta.set(image.meta);
    } else {
      this.postImageDetailMeta.set({
        name: this.extractFileName(image.image_url),
        size: '—',
        type: this.guessImageType(image.image_url),
        width: 0,
        height: 0,
        resolution: '...',
        lastModified: '—',
      });
    }

    this.postImageDetailOpen.set(true);
  }

  onPostDetailImageLoad(event: Event): void {
    const img = event.target as HTMLImageElement;
    this.postImageDetailNaturalWidth.set(img.naturalWidth);
    this.postImageDetailNaturalHeight.set(img.naturalHeight);
    const meta = this.postImageDetailMeta();
    if (meta) {
      this.postImageDetailMeta.set({
        ...meta,
        width: img.naturalWidth,
        height: img.naturalHeight,
        resolution: `${img.naturalWidth} × ${img.naturalHeight}`,
      });
    }
  }

  closePostImageDetail(): void {
    this.postImageDetailOpen.set(false);
    this.postImageDetailImage.set(null);
    this.postImageDetailMeta.set(null);
  }

  downloadPostImage(image: GalleryImage): void {
    const link = document.createElement('a');
    link.href = image.objectUrl || image.image_url;
    link.download = this.extractFileName(image.image_url);
    link.target = '_blank';
    link.click();
  }

  openGallery(product: ProductWithHelpers): void {
    this.productService.invalidateImageCache();
    this.galleryProduct.set(product);
    this.galleryImages.set([]);
    this.galleryOpen.set(true);
    this.galleryLoading.set(true);
    this.uploadTransparent.set(false);
    document.body.style.overflow = 'hidden';

    if (MOCK_MODE) {
      this.loadMockGalleryImages(product);
      return;
    }

    this.productService.getProductImages(product.id).subscribe({
      next: (images: ProductImage[]) => {
        this.galleryImages.set(images as GalleryImage[]);
        this.galleryLoading.set(false);
      },
      error: () => {
        this.galleryLoading.set(false);
      },
    });
  }

  private loadMockGalleryImages(product: ProductWithHelpers): void {
    const mockImages: GalleryImage[] = [];
    if (product.thumbnail_url) {
      mockImages.push({
        id: 'mock-1',
        product_id: product.id,
        image_url: product.thumbnail_url,
        alt_text_hu: product.name_hu || product.name,
        alt_text_en: product.name_en || product.name,
        alt_text_de: product.name_de || product.name,
        sort_id: '1',
      });
    }
    if (product.images && product.images.length > 0) {
      product.images.forEach((url, i) => {
        if (url !== product.thumbnail_url) {
          mockImages.push({
            id: `mock-${i + 2}`,
            product_id: product.id,
            image_url: url,
            alt_text_hu: product.name_hu || product.name,
            alt_text_en: product.name_en || product.name,
            alt_text_de: product.name_de || product.name,
            sort_id: `${i + 2}`,
          });
        }
      });
    }
    this.galleryImages.set(mockImages);
    this.galleryLoading.set(false);
  }

  closeGallery(): void {
    this.galleryImages().forEach((img) => {
      if (img.objectUrl) URL.revokeObjectURL(img.objectUrl);
    });
    this.galleryOpen.set(false);
    this.galleryProduct.set(null);
    this.galleryImages.set([]);
    this.uploadTransparent.set(false);
    if (!this.detailOpen()) {
      document.body.style.overflow = '';
    }
  }

  onGalleryOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('gallery-overlay')) {
      this.closeGallery();
    }
  }

  toggleTransparent(): void {
    this.uploadTransparent.update((v) => !v);
  }

  triggerFileUpload(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = (e: Event) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) this.handleFileUpload(files);
    };
    input.click();
  }

  private async handleFileUpload(files: FileList): Promise<void> {
    const product = this.galleryProduct();
    if (!product) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const objectUrl = URL.createObjectURL(file);

      const img = new Image();
      const dims = await new Promise<{ w: number; h: number }>((resolve) => {
        img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
        img.onerror = () => resolve({ w: 0, h: 0 });
        img.src = objectUrl;
      });

      const newImage: GalleryImage = {
        id: `new-${Date.now()}-${i}`,
        product_id: product.id,
        image_url: objectUrl,
        alt_text_hu: file.name,
        alt_text_en: file.name,
        alt_text_de: file.name,
        sort_id: `${this.galleryImages().length + 1}`,
        file,
        objectUrl,
        meta: {
          name: file.name,
          size: formatFileSize(file.size),
          type: file.type || 'unknown',
          width: dims.w,
          height: dims.h,
          resolution: dims.w > 0 ? `${dims.w} × ${dims.h}` : '—',
          lastModified: new Date(file.lastModified).toLocaleDateString('hu-HU'),
        },
      };

      this.galleryImages.update((imgs) => [...imgs, newImage]);

      if (!MOCK_MODE) {
        this.uploadImageToBackend(product.id, file, newImage.id);
      }
    }
  }

  private uploadImageToBackend(productId: string, file: File, tempId: string): void {
    this.uploadInProgress.set(true);
    const adminId = sessionStorage.getItem('user_id') ?? '';
    const adminSessionToken =
      this.authService.getSessionToken() ?? this.authService.getToken() ?? '';

    const reader = new FileReader();
    reader.onload = () => {
      const imageBase64 = reader.result as string;

      this.productService
        .uploadProductImageAdmin(
          adminId,
          adminSessionToken,
          productId,
          imageBase64,
          this.uploadTransparent(),
        )
        .subscribe({
          next: (res) => {
            if (res.statuscode === '200' && res.image) {
              this.galleryImages.update((imgs) =>
                imgs.map((img) =>
                  img.id === tempId
                    ? {
                        ...img,
                        id: res.image!.id,
                        image_url: res.image!.image_url,
                        file: undefined,
                      }
                    : img,
                ),
              );
              this.productService.invalidateImageCache();
            }
            this.uploadInProgress.set(false);
          },
          error: () => {
            this.uploadInProgress.set(false);
          },
        });
    };
    reader.onerror = () => {
      this.uploadInProgress.set(false);
    };
    reader.readAsDataURL(file);
  }

  requestDeleteImage(image: GalleryImage, event: MouseEvent): void {
    event.stopPropagation();
    this.deleteTargetImage.set(image);
    this.deleteConfirmOpen.set(true);
  }

  confirmDeleteImage(): void {
    const target = this.deleteTargetImage();
    const product = this.galleryProduct();
    if (!target || !product) return;

    if (target.id.startsWith('new-')) {
      if (target.objectUrl) URL.revokeObjectURL(target.objectUrl);
      this.galleryImages.update((imgs) => imgs.filter((img) => img.id !== target.id));
      this.cancelDeleteImage();
      return;
    }

    const adminId = sessionStorage.getItem('user_id') ?? '';
    const adminSessionToken =
      this.authService.getSessionToken() ?? this.authService.getToken() ?? '';

    this.productService
      .deleteProductImageAdmin(adminId, adminSessionToken, product.id, target.id)
      .subscribe({
        next: (res) => {
          if (res.statuscode === '200') {
            if (target.objectUrl) URL.revokeObjectURL(target.objectUrl);
            this.galleryImages.update((imgs) => imgs.filter((img) => img.id !== target.id));
            this.productService.invalidateImageCache();
            this.toastService.show('admin.gallery.image_deleted', 'success');
          } else {
            this.toastService.show('admin.gallery.delete_error', 'error');
          }
          this.cancelDeleteImage();
        },
        error: () => {
          this.toastService.show('admin.gallery.delete_error', 'error');
          this.cancelDeleteImage();
        },
      });
  }

  cancelDeleteImage(): void {
    this.deleteConfirmOpen.set(false);
    this.deleteTargetImage.set(null);
  }

  openImageDetail(image: GalleryImage): void {
    this.detailImage.set(image);
    this.detailNaturalWidth.set(0);
    this.detailNaturalHeight.set(0);

    if (image.meta) {
      this.detailMeta.set(image.meta);
    } else {
      this.detailMeta.set({
        name: this.extractFileName(image.image_url),
        size: '—',
        type: this.guessImageType(image.image_url),
        width: 0,
        height: 0,
        resolution: '...',
        lastModified: '—',
      });
    }

    this.detailOpen.set(true);
  }

  onDetailImageLoad(event: Event): void {
    const img = event.target as HTMLImageElement;
    this.detailNaturalWidth.set(img.naturalWidth);
    this.detailNaturalHeight.set(img.naturalHeight);
    const meta = this.detailMeta();
    if (meta) {
      this.detailMeta.set({
        ...meta,
        width: img.naturalWidth,
        height: img.naturalHeight,
        resolution: `${img.naturalWidth} × ${img.naturalHeight}`,
      });
    }
  }

  downloadImage(image: GalleryImage): void {
    const link = document.createElement('a');
    link.href = image.objectUrl || image.image_url;
    link.download = this.extractFileName(image.image_url);
    link.target = '_blank';
    link.click();
  }

  private buildAdminAuth(): { id: string; session_token: string } {
    const storedId = sessionStorage.getItem('user_id') ?? '';
    const token = this.authService.getSessionToken() ?? this.authService.getToken() ?? '';
    return {
      id: btoa(storedId),
      session_token: btoa(token),
    };
  }

  onDetailOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('detail-overlay')) {
      this.closeImageDetail();
    }
  }

  closeImageDetail(): void {
    this.detailOpen.set(false);
    this.detailImage.set(null);
    this.detailMeta.set(null);
  }

  closeDetail(): void {
    this.closeImageDetail();
  }

  getPostCategoryName(categoryId: string): string {
    const cat = this.availablePostCategories().find((c) => c.id === categoryId);
    return cat ? cat.display_name : categoryId;
  }

  openPostGalleryFromForm(): void {
    const editId = this.postFormEditId();
    if (!editId) return;
    const post = this.apiPosts().find((p) => p.id === editId);
    if (!post) return;
    this.closePostForm();
    this.openPostGallery(post);
  }

  protected extractFileName(url: string): string {
    try {
      return url.split('/').pop()?.split('?')[0] || 'image';
    } catch {
      return 'image';
    }
  }

  private guessImageType(url: string): string {
    const ext = url.split('.').pop()?.toLowerCase();
    const map: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
      gif: 'image/gif',
      svg: 'image/svg+xml',
    };
    return map[ext ?? ''] || 'image/*';
  }
}
