import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  firstname = signal('');
  lastname = signal('');
  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.errorMessage.set('');
    this.successMessage.set('');

    if (
      !this.email() ||
      !this.password() ||
      !this.confirmPassword() ||
      !this.firstname() ||
      !this.lastname()
    ) {
      this.errorMessage.set('auth.errors.empty_fields');
      return;
    }

    if (!this.isValidEmail(this.email())) {
      this.errorMessage.set('auth.errors.invalid_email');
      return;
    }

    if (this.password().length < 8) {
      this.errorMessage.set('auth.errors.password_too_short');
      return;
    }

    if (this.password() !== this.confirmPassword()) {
      this.errorMessage.set('auth.errors.passwords_dont_match');
      return;
    }

    this.isLoading.set(true);

    this.authService
      .register(this.email(), this.password(), this.firstname(), this.lastname())
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.successMessage.set('auth.register.success_message');
        },
        error: (error) => {
          this.isLoading.set(false);
          this.errorMessage.set(error.message || 'auth.errors.registration_failed');
        },
      });
  }

  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
