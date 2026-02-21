import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
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
  private location = inject(Location);

  newPassword = signal('');
  confirmPassword = signal('');
  userId = signal<string>('');
  token = signal<string>('');
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
      const id = params['id'];
      const token = params['token'];

      if (!id || !token) {
        this.errorMessage.set('auth.errors.invalid_reset_link');
        return;
      }

      const cleanUrl = `/password-reset?id=${id}&token=${token}`;
      this.location.replaceState(cleanUrl);

      this.userId.set(id);
      this.token.set(token);
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

    const id = this.userId();
    const token = this.token();

    if (!id || !token) {
      this.errorMessage.set('auth.errors.invalid_reset_link');
      return;
    }

    this.isLoading.set(true);

    this.authService.completePasswordChange(id, token).subscribe({
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
