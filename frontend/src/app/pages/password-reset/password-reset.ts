import { Component, OnInit, signal, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './password-reset.html',
  styleUrl: './password-reset.css',
})
export class PasswordReset implements OnInit {
  private router = inject(Router);
  private location = inject(Location);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private translateService = inject(TranslateService);

  isProcessing = signal(false);
  isSuccess = signal(false);
  errorMessage = signal('');

  ngOnInit(): void {
    const raw = new URLSearchParams(window.location.search).get('chpass') || '';
    const parts = raw.split(';');

    if (parts.length !== 2) {
      this.errorMessage.set('auth.errors.invalid_reset_link');
      return;
    }

    const encodedId = parts[0].trim();
    const encodedToken = parts[1].trim();

    if (!encodedId || !encodedToken) {
      this.errorMessage.set('auth.errors.invalid_reset_link');
      return;
    }

    const cleanUrl = `/password-reset?chpass=${encodedId};${encodedToken}`;
    this.location.replaceState(cleanUrl);

    this.completePasswordReset(encodedId, encodedToken);
  }

  completePasswordReset(encodedId: string, encodedToken: string): void {
    this.isProcessing.set(true);
    this.errorMessage.set('');

    this.authService.completePasswordChange(encodedId, encodedToken).subscribe({
      next: () => {
        this.isProcessing.set(false);
        this.isSuccess.set(true);
        const message = this.translateService.instant('auth.success.password_changed');
        this.toastService.success(message);
      },
      error: (error) => {
        this.isProcessing.set(false);
        this.errorMessage.set(error.message || 'auth.errors.password_reset_failed');
        this.authService.logout();
      },
    });
  }

  backToLogin(): void {
    this.router.navigate(['/login']);
  }
}
