import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
/*
 * Backend response note (bug in backend service):
 *   On success the service returns (200, "success") instead of the JSON body,
 *   so no JWT token is returned → the user must log in again after the reset.
 */
@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './password-reset.html',
  styleUrl: './password-reset.css',
})
export class PasswordReset implements OnInit {
  private location = inject(Location);
  private authService = inject(AuthService);

  isProcessing = signal(false);
  isSuccess = signal(false);
  errorMessage = signal('');

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Read the ?chpass=B64(id);B64(token) param from the URL
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

  /** Calls chpass_promise endpoint with the B64 values from the email link */
  completePasswordReset(encodedId: string, encodedToken: string): void {
    this.isProcessing.set(true);
    this.errorMessage.set('');

    this.authService.completePasswordChange(encodedId, encodedToken).subscribe({
      next: () => {
        this.isProcessing.set(false);
        this.isSuccess.set(true);
        // Backend does not return a new JWT token (known backend bug),
        // so we log the user out and redirect to login after success.
        this.authService.logout();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2500);
      },
      error: (error) => {
        this.isProcessing.set(false);
        this.errorMessage.set(error.message || 'auth.errors.password_reset_failed');
      },
    });
  }

  backToLogin(): void {
    this.router.navigate(['/login']);
  }
}
