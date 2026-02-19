import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { AccountService } from '../../core/services/account.service';
import { ToastService } from '../../core/services/toast.service';

type ProfilePanel = 'none' | 'edit' | 'delete';

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
    const userData = this.user();
    if (!userData) return '';
    return `${userData.firstname} ${userData.lastname}`.trim();
  });

  email = computed(() => this.user()?.email || '');

  // Panel state
  activePanel = signal<ProfilePanel>('none');

  // Edit profile form
  editFirstname = signal('');
  editLastname = signal('');
  isUpdatingProfile = signal(false);
  editErrorMessage = signal('');

  // Delete account
  deletePassword = signal('');
  showDeletePassword = signal(false);
  isDeletingAccount = signal(false);
  deleteErrorMessage = signal('');
  deleteConfirmationSent = signal(false);

  ngOnInit(): void {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openEditPanel(): void {
    const u = this.user();
    this.editFirstname.set(u?.firstname || '');
    this.editLastname.set(u?.lastname || '');
    this.editErrorMessage.set('');
    this.activePanel.set('edit');
  }

  openDeletePanel(): void {
    this.deletePassword.set('');
    this.deleteErrorMessage.set('');
    this.deleteConfirmationSent.set(false);
    this.activePanel.set('delete');
  }

  closePanel(): void {
    this.activePanel.set('none');
  }

  goToChangePassword(): void {
    this.router.navigate(['/password-reset-request']);
  }

  saveProfile(): void {
    this.editErrorMessage.set('');
    const firstname = this.editFirstname().trim();
    const lastname = this.editLastname().trim();

    if (!firstname || !lastname) {
      this.editErrorMessage.set('profile.errors.name_required');
      return;
    }

    this.isUpdatingProfile.set(true);

    this.accountService.updateProfile({ firstname, lastname }).subscribe({
      next: () => {
        this.isUpdatingProfile.set(false);
        this.closePanel();
        this.toastService.success('profile.success.profile_updated');
      },
      error: (error) => {
        this.isUpdatingProfile.set(false);
        this.editErrorMessage.set(error.message || 'profile.errors.update_failed');
      },
    });
  }

  requestDeleteAccount(): void {
    this.deleteErrorMessage.set('');
    const password = this.deletePassword().trim();

    if (!password) {
      this.deleteErrorMessage.set('auth.errors.empty_fields');
      return;
    }

    const userId = this.user()?.id;
    if (!userId) {
      this.deleteErrorMessage.set('auth.errors.not_authenticated');
      return;
    }

    this.isDeletingAccount.set(true);

    this.accountService.deleteAccountRequest(userId, password).subscribe({
      next: () => {
        this.isDeletingAccount.set(false);
        this.deleteConfirmationSent.set(true);
      },
      error: (error) => {
        this.isDeletingAccount.set(false);
        this.deleteErrorMessage.set(error.message || 'profile.errors.delete_failed');
      },
    });
  }

  toggleDeletePassword(): void {
    this.showDeletePassword.set(!this.showDeletePassword());
  }
}
