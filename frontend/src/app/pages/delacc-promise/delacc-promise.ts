import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountService } from '../../core/services/account.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-delacc-promise',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './delacc-promise.html',
  styleUrl: './delacc-promise.css',
})
export class DelaccPromise implements OnInit {
  private location = inject(Location);
  private accountService = inject(AccountService);
  private authService = inject(AuthService);

  isProcessing = signal(false);
  isSuccess = signal(false);
  errorMessage = signal('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const accdel = params['accdel'];

      if (!accdel) {
        this.errorMessage.set('auth.errors.invalid_link');
        return;
      }

      const parts = accdel.split(';');

      if (parts.length !== 2) {
        this.errorMessage.set('auth.errors.invalid_link');
        return;
      }

      // The backend email link sends: B64(email);B64(confirmation_token)
      // confirmAccountDeletion() now expects already-B64 values — pass them as-is
      const encodedId = parts[0].trim();
      const encodedToken = parts[1].trim();

      if (!encodedId || !encodedToken) {
        this.errorMessage.set('auth.errors.invalid_link');
        return;
      }

      const cleanUrl = `/delacc-promise?accdel=${encodedId};${encodedToken}`;
      this.location.replaceState(cleanUrl);

      this.confirmDeletion(encodedId, encodedToken);
    });
  }

  confirmDeletion(encodedId: string, encodedToken: string): void {
    this.isProcessing.set(true);
    this.errorMessage.set('');

    // Pass the already-B64-encoded values — the service no longer re-encodes
    this.accountService.confirmAccountDeletion(encodedId, encodedToken).subscribe({
      next: () => {
        this.isProcessing.set(false);
        this.isSuccess.set(true);
        // authService.logout() is called inside confirmAccountDeletion
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 3000);
      },
      error: (error) => {
        this.isProcessing.set(false);
        this.errorMessage.set(error.message || 'profile.errors.delete_failed');
      },
    });
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
