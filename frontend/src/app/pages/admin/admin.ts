import { Component, HostListener, signal, computed, inject, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { AccountService, AdminUser, AdminOrder } from '../../core/services/account.service';
import { ProductService } from '../../core/services/product.service';
import { ToastService } from '../../core/services/toast.service';
import { ProductWithHelpers } from '../../core/models/product.model';
import { ICONS } from '../../core/constants/visuals';
import { ResizableTableDirective } from '../../shared/directives/resizable-table.directive';
import { formatFileSize } from '../../core/utils/image-utils';
import { MOCK_MODE, MOCK_USERS, MOCK_ORDERS } from './admin.mock';

import {
  AdminSection,
  NavItem,
  ImageMeta,
  GalleryImage,
  ProductFormTab,
  ProductFormData,
  UserActionType,
  UserActionRequest,
  ACCOUNT_STATES,
  ORDER_COLUMNS,
  USER_COLUMNS,
  PRODUCT_COLUMNS,
} from '../../core/models/admin.models';
import { emptyProductForm, smartFilter } from '../../core/utils/admin.utils';

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
  private toastService = inject(ToastService);
  private translate = inject(TranslateService);
  private router = inject(Router);

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

  usersLoading = signal(false);
  usersError = signal<string | null>(null);
  ordersLoading = signal(false);
  ordersError = signal<string | null>(null);
  productsLoading = signal(false);
  productsError = signal<string | null>(null);

  apiUsers = signal<AdminUser[]>([]);
  apiOrders = signal<AdminOrder[]>([]);

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

  productFormIsEdit = computed(() => this.productFormEditId() !== null);

  availableCategories = computed(() => this.productService.categories());

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
  ];

  productFormTabs: { id: ProductFormTab; label: string }[] = [
    { id: 'basic', label: 'admin.product_form.tab_basic' },
    { id: 'pricing', label: 'admin.product_form.tab_pricing' },
    { id: 'descriptions', label: 'admin.product_form.tab_descriptions' },
    { id: 'details', label: 'admin.product_form.tab_details' },
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
      superadmin: 'role-admin',
      verified: 'role-pharmacist',
      unverified: 'role-user',
      banned: 'role-banned',
      deleted: 'role-deleted',
    };
    return map[state] ?? 'role-user';
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

  trackById(_index: number, item: { id: string }): string {
    return item.id;
  }

  trackByProductId(_index: number, item: ProductWithHelpers): string {
    return item.id;
  }

  isSelf(user: AdminUser): boolean {
    return user.id === this.currentAdminId();
  }

  toggleUserMenu(userId: string, event: MouseEvent): void {
    event.stopPropagation();
    this.activeUserMenu.update((current) => (current === userId ? null : userId));
  }

  getAvailableStates(user: AdminUser): string[] {
    return ACCOUNT_STATES.filter((s) => s !== user.account_state);
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

    switch (req.action) {
      case 'change_role':
      case 'unban':
        this.accountService.updateUserStateAdmin(req.user.id, req.newState!).subscribe({
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
        this.accountService.banUserAdmin(req.user.id).subscribe({
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
        description_hu: product.description_hu || product.description_hu || '',
        description_en: product.description_en || product.description_en || '',
        description_de: product.description_de || product.description_de || '',
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
        active_ingredients: product.active_ingredients || product.active_ingredients || '',
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

  private buildAdminAuth(): { id: string; session_token: string } {
    const storedId = sessionStorage.getItem('user_id') ?? '';
    const token = this.authService.getSessionToken() ?? this.authService.getToken() ?? '';
    return {
      id: btoa(storedId),
      session_token: btoa(token),
    };
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
    } else {
      this.productService.getProductImages(product.id).subscribe({
        next: (images) => {
          this.galleryImages.set(
            images.map((img) => ({
              ...img,
              objectUrl: undefined,
              file: undefined,
              meta: undefined,
            })),
          );
          this.galleryLoading.set(false);
        },
        error: () => {
          this.galleryLoading.set(false);
        },
      });
    }
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

  getProductImageCount(product: ProductWithHelpers): number {
    const count = product.images?.length ?? 0;
    return count > 0 ? count : product.thumbnail_url ? 1 : 0;
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
    const auth = this.buildAdminAuth();

    this.productService
      .uploadProductImageAdmin(auth, productId, file.name, this.uploadTransparent())
      .subscribe({
        next: (res) => {
          if (res.statuscode === '200' && res.image) {
            this.galleryImages.update((imgs) =>
              imgs.map((img) =>
                img.id === tempId
                  ? { ...img, id: res.image!.id, image_url: res.image!.image_url, file: undefined }
                  : img,
              ),
            );
            this.productService.invalidateImageCache();
          }
          this.uploadInProgress.set(false);
        },
        error: (err) => {
          console.error('Image upload failed:', err);
          this.uploadInProgress.set(false);
        },
      });
  }

  requestDeleteImage(image: GalleryImage, event: MouseEvent): void {
    event.stopPropagation();
    this.deleteTargetImage.set(image);
    this.deleteConfirmOpen.set(true);
  }

  confirmDeleteImage(): void {
    const target = this.deleteTargetImage();
    if (!target) return;

    if (target.objectUrl) {
      URL.revokeObjectURL(target.objectUrl);
    }

    this.galleryImages.update((imgs) => imgs.filter((img) => img.id !== target.id));
    this.productService.invalidateImageCache();
    this.cancelDeleteImage();
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

  closeImageDetail(): void {
    this.detailOpen.set(false);
    this.detailImage.set(null);
    this.detailMeta.set(null);
  }

  onDetailOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('detail-overlay')) {
      this.closeImageDetail();
    }
  }

  extractFileName(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1] || 'image';
  }

  private guessImageType(url: string): string {
    const ext = url.split('.').pop()?.toLowerCase();
    const map: Record<string, string> = {
      webp: 'image/webp',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      svg: 'image/svg+xml',
    };
    return map[ext ?? ''] ?? 'image/*';
  }

  downloadImage(image: GalleryImage): void {
    const link = document.createElement('a');
    link.href = image.objectUrl || image.image_url;
    link.download = this.extractFileName(image.image_url);
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
