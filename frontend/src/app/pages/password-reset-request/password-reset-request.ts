import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-password-reset-request',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './password-reset-request.html',
  styleUrl: './password-reset-request.css',
})
export class PasswordResetRequest {
  email = signal('');
  newPassword = signal('');
  confirmPassword = signal('');
  showPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');
  isEmailSent = signal(false);
  language = computed(() => this.translationService.getCurrentLanguage());

  constructor(
    private authService: AuthService,
    private router: Router,
    private translationService: TranslationService,
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  onSubmit(): void {
    this.errorMessage.set('');

    if (!this.email()) {
      this.errorMessage.set('auth.errors.email_required');
      return;
    }

    if (!this.isValidEmail(this.email())) {
      this.errorMessage.set('auth.errors.invalid_email');
      return;
    }

    if (!this.newPassword()) {
      this.errorMessage.set('auth.errors.empty_fields');
      return;
    }

    if (this.newPassword().length < 8) {
      this.errorMessage.set('auth.errors.password_too_short');
      return;
    }

    if (this.newPassword() !== this.confirmPassword()) {
      this.errorMessage.set('auth.errors.passwords_dont_match');
      return;
    }

    this.isLoading.set(true);

    this.authService
      .requestPasswordChange(this.email(), this.newPassword(), this.language())
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.isEmailSent.set(true);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.errorMessage.set(error.message || 'auth.errors.request_failed');
        },
      });
  }

  backToLogin(): void {
    this.router.navigate(['/login']);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
