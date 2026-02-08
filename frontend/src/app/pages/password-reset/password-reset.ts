import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './password-reset.html',
  styleUrl: './password-reset.css',
})
export class PasswordReset implements OnInit {
  newPassword = signal('');
  confirmPassword = signal('');
  sessionToken = signal<string | null>(null);
  isLoading = signal(false);
  errorMessage = signal('');
  isSuccess = signal(false);
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      if (!token) {
        this.errorMessage.set('auth.errors.invalid_reset_link');
        return;
      }
      this.sessionToken.set(token);
    });
  }

  onSubmit(): void {
    this.errorMessage.set('');

    if (!this.newPassword() || !this.confirmPassword()) {
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

    const token = this.sessionToken();
    if (!token) {
      this.errorMessage.set('auth.errors.invalid_reset_link');
      return;
    }

    this.isLoading.set(true);

    this.authService.completePasswordChange(token, this.newPassword()).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.isSuccess.set(true);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.message || 'auth.errors.password_reset_failed');
      },
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }
}
