import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { SupportedLanguage, TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private translationService = inject(TranslationService);

  email = signal('');
  password = signal('');
  stayLoggedIn = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');
  showPassword = signal(false);
  isEmailSent = signal(false);

  language = computed(() => this.translationService.getCurrentLanguage());

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.errorMessage.set('');

    if (!this.email() || !this.password()) {
      this.errorMessage.set('auth.errors.empty_fields');
      return;
    }

    if (!this.isValidEmail(this.email())) {
      this.errorMessage.set('auth.errors.invalid_email');
      return;
    }

    this.isLoading.set(true);

    this.authService.loginRequest(this.email(), this.password(), this.language()).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.isEmailSent.set(true);
        // Store stayLoggedIn preference so login-promise page can use it
        sessionStorage.setItem('login_stay', this.stayLoggedIn() ? '1' : '0');
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.message || 'auth.errors.login_failed');
      },
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
