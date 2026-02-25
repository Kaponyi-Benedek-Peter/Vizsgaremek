import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { AccountService } from '../../core/services/account.service';
import { ToastService } from '../../core/services/toast.service';

export type ProfileSection = 'overview' | 'personal' | 'security' | 'orders' | 'danger';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslateModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  private toastService = inject(ToastService);
  private router = inject(Router);

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

  activeSection = signal<ProfileSection>('overview');

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

  savePersonalInfo(): void {
    this.profileEditError.set('');
    this.profileEditSuccess.set(false);

    const firstname = this.editFirstname.trim();
    const lastname = this.editLastname.trim();

    if (!firstname || !lastname) {
      this.profileEditError.set('profile.errors.name_required');
      return;
    }

    this.isUpdatingProfile.set(true);

    this.accountService.updateProfile({ firstname, lastname }).subscribe({
      next: () => {
        this.isUpdatingProfile.set(false);
        this.profileEditSuccess.set(true);
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

    this.authService.requestPasswordChange(userEmail, this.changePasswordNew).subscribe({
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

    this.accountService.deleteAccountRequest(userId, password).subscribe({
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
