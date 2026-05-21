import { Component, OnInit, signal, computed, inject } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { AccountService, AdminOrder } from '../../core/services/account.service';
import { ToastService } from '../../core/services/toast.service';
import { TranslationService } from '../../core/services/translation.service';
import { DatePipe } from '@angular/common';

export type ProfileSection = 'overview' | 'personal' | 'security' | 'orders' | 'danger';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, FormsModule, TranslatePipe, DatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private translationService = inject(TranslationService);

  user = this.authService.currentUser;
  isAuthenticated = this.authService.isAuthenticated;

  fullName = computed(() => {
    const u = this.user();
    if (!u) return '';
    return `${u.firstname} ${u.lastname}`.trim();
  });

  initials = computed(() => {
    const u = this.user();
    if (!u) return '?';
    const f = u.firstname?.[0] ?? '';
    const l = u.lastname?.[0] ?? '';
    return (f + l).toUpperCase() || '?';
  });

  email = computed(() => this.user()?.email ?? '');
  accountState = computed(() => this.user()?.account_state ?? 'verified');
  language = computed(() => this.translationService.getCurrentLanguage());

  activeSection = signal<ProfileSection>('overview');

  orders = signal<AdminOrder[]>([]);
  isLoadingOrders = signal(false);
  ordersError = signal('');

  orderCount = computed(() => this.orders().length);

  isAdmin = computed(() => {
    const state = this.accountState();
    return state === 'admin' || state === 'superadmin';
  });

  accountStateBadgeKey = computed(() => {
    switch (this.accountState()) {
      case 'superadmin':
        return 'profile.role.superadmin';
      case 'admin':
        return 'profile.role.admin';
      case 'verified':
        return 'profile.role.verified';
      default:
        return 'profile.role.verified';
    }
  });

  editFirstname = '';
  editLastname = '';
  isUpdatingProfile = signal(false);
  profileEditError = signal('');
  profileEditSuccess = signal(false);

  changePasswordNew = '';
  changePasswordConfirm = '';
  showNewPassword = signal(false);
  showConfirmPassword = signal(false);
  isChangingPassword = signal(false);
  changePasswordError = signal('');
  changePasswordEmailSent = signal(false);

  deletePassword = '';
  showDeletePassword = signal(false);
  isDeletingAccount = signal(false);
  deleteError = signal('');
  deleteConfirmationSent = signal(false);

  isSidebarOpen = signal(false);

  ngOnInit(): void {
    this.loadPersonalInfoIntoForm();
    this.loadOrders();
  }

  setSection(section: ProfileSection): void {
    this.activeSection.set(section);
    this.isSidebarOpen.set(false);
    this.resetForms();
  }

  toggleSidebar(): void {
    this.isSidebarOpen.update((v) => !v);
  }

  logout(): void {
    this.authService.logout();
  }

  loadPersonalInfoIntoForm(): void {
    const u = this.user();
    this.editFirstname = u?.firstname ?? '';
    this.editLastname = u?.lastname ?? '';
  }

  loadOrders(): void {
    const userId = this.authService.getUserId();
    const sessionToken = this.authService.getSessionToken();
    if (!userId || !sessionToken) return;

    this.isLoadingOrders.set(true);
    this.ordersError.set('');

    if (this.isAdmin()) {
      this.accountService.getAllOrdersAdmin().subscribe({
        next: (res) => {
          this.isLoadingOrders.set(false);
          if (res.statuscode === '200' && Array.isArray(res.orders)) {
            this.orders.set(res.orders);
          }
        },
        error: () => {
          this.isLoadingOrders.set(false);
          this.ordersError.set('profile.orders.load_error');
        },
      });
    } else {
      this.accountService.getOrders({ id: userId, session_token: sessionToken }).subscribe({
        next: (res) => {
          this.isLoadingOrders.set(false);
          if (res.statuscode === '200' && Array.isArray(res.orders)) {
            this.orders.set(res.orders);
          }
        },
        error: () => {
          this.isLoadingOrders.set(false);
          this.ordersError.set('profile.orders.load_error');
        },
      });
    }
  }

  savePersonalInfo(): void {
    this.profileEditError.set('');
    this.profileEditSuccess.set(false);

    const firstname = this.editFirstname.trim();
    const lastname = this.editLastname.trim();
    const userId = this.authService.getUserId();
    const token = this.authService.getSessionToken();

    if (!userId || !token) return;

    if (!firstname || !lastname) {
      this.profileEditError.set('profile.errors.name_required');
      return;
    }

    this.isUpdatingProfile.set(true);

    this.accountService
      .updateProfile(firstname, lastname, this.authService.getToken()!, userId)
      .subscribe({
        next: () => {
          this.isUpdatingProfile.set(false);
          this.profileEditSuccess.set(true);
          this.authService.patchCurrentUser({ firstname, lastname });
          this.authService.storePendingUserName(firstname, lastname);
          this.loadPersonalInfoIntoForm();
          this.toastService.success('profile.success.profile_updated');
        },
        error: (err) => {
          this.isUpdatingProfile.set(false);
          this.profileEditError.set(err.message ?? 'profile.errors.update_failed');
        },
      });
  }

  requestPasswordChange(): void {
    this.changePasswordError.set('');
    this.changePasswordEmailSent.set(false);

    if (!this.changePasswordNew || this.changePasswordNew.length < 6) {
      this.changePasswordError.set('profile.errors.new_password_too_short');
      return;
    }
    if (this.changePasswordNew !== this.changePasswordConfirm) {
      this.changePasswordError.set('profile.errors.passwords_do_not_match');
      return;
    }

    const userEmail = this.email();
    if (!userEmail) {
      this.changePasswordError.set('auth.errors.not_authenticated');
      return;
    }

    this.isChangingPassword.set(true);

    this.authService
      .requestPasswordChange(userEmail, this.changePasswordNew, this.language())
      .subscribe({
        next: () => {
          this.isChangingPassword.set(false);
          this.changePasswordEmailSent.set(true);
          this.changePasswordNew = '';
          this.changePasswordConfirm = '';
        },
        error: (err) => {
          this.isChangingPassword.set(false);
          this.changePasswordError.set(err.message ?? 'profile.errors.password_change_failed');
        },
      });
  }

  requestDeleteAccount(): void {
    this.deleteError.set('');

    const password = this.deletePassword.trim();
    if (!password) {
      this.deleteError.set('auth.errors.empty_fields');
      return;
    }

    const userId = this.user()?.id;
    if (!userId) {
      this.deleteError.set('auth.errors.not_authenticated');
      return;
    }

    this.isDeletingAccount.set(true);

    this.accountService.deleteAccountRequest(userId, password, this.language()).subscribe({
      next: () => {
        this.isDeletingAccount.set(false);
        this.deleteConfirmationSent.set(true);
      },
      error: (err) => {
        this.isDeletingAccount.set(false);
        this.deleteError.set(err.message ?? 'profile.errors.delete_failed');
      },
    });
  }

  togglePasswordVisibility(field: 'new' | 'confirm' | 'delete'): void {
    if (field === 'new') this.showNewPassword.update((v) => !v);
    else if (field === 'confirm') this.showConfirmPassword.update((v) => !v);
    else this.showDeletePassword.update((v) => !v);
  }

  private resetForms(): void {
    this.profileEditError.set('');
    this.profileEditSuccess.set(false);
    this.changePasswordError.set('');
    this.changePasswordEmailSent.set(false);
    this.deleteError.set('');
    this.deleteConfirmationSent.set(false);
    this.changePasswordNew = '';
    this.changePasswordConfirm = '';
    this.loadPersonalInfoIntoForm();
  }
}
