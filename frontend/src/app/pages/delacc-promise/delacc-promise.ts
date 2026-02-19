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

      // The email link sends B64(email);B64(token)
      // But delacc_promise requires id + token
      // We decode the email part to get user ID
      const idOrEmail = parts[0].trim();
      const token = parts[1].trim();

      if (!idOrEmail || !token) {
        this.errorMessage.set('auth.errors.invalid_link');
        return;
      }

      const cleanUrl = `/delacc-promise?accdel=${idOrEmail};${token}`;
      this.location.replaceState(cleanUrl);

      this.confirmDeletion(idOrEmail, token);
    });
  }

  confirmDeletion(id: string, token: string): void {
    this.isProcessing.set(true);
    this.errorMessage.set('');

    this.accountService.confirmAccountDeletion(id, token).subscribe({
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
