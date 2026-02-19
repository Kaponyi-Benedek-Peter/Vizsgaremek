import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login-promise',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './login-promise.html',
  styleUrl: './login-promise.css',
})
export class LoginPromise implements OnInit {
  private location = inject(Location);

  isVerifying = signal(false);
  isSuccess = signal(false);
  errorMessage = signal('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const loginPromise = params['login_promise'];

      if (!loginPromise) {
        this.errorMessage.set('auth.errors.invalid_login_link');
        return;
      }

      const parts = loginPromise.split(';');

      if (parts.length !== 2) {
        this.errorMessage.set('auth.errors.invalid_login_link');
        return;
      }

      const id = parts[0].trim();
      const confirmationToken = parts[1].trim();

      if (!id || !confirmationToken) {
        this.errorMessage.set('auth.errors.invalid_login_link');
        return;
      }

      const cleanUrl = `/login-promise?login_promise=${id};${confirmationToken}`;
      this.location.replaceState(cleanUrl);

      const stayLoggedIn = sessionStorage.getItem('login_stay') === '1';
      sessionStorage.removeItem('login_stay');

      this.completeLogin(id, confirmationToken, stayLoggedIn);
    });
  }

  completeLogin(id: string, confirmationToken: string, stayLoggedIn: boolean): void {
    this.isVerifying.set(true);
    this.errorMessage.set('');

    this.authService.loginPromise(id, confirmationToken, stayLoggedIn).subscribe({
      next: () => {
        this.isVerifying.set(false);
        this.isSuccess.set(true);
        // Navigation is handled by loginPromise → handleLoginSuccess → router.navigate(['/home'])
      },
      error: (error) => {
        this.isVerifying.set(false);
        this.errorMessage.set(error.message || 'auth.errors.login_failed');
      },
    });
  }

  backToLogin(): void {
    this.router.navigate(['/login']);
  }
}
