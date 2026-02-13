import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './email.html',
  styleUrl: './email.css',
})
export class Email implements OnInit {
  private location = inject(Location);

  isVerifying = signal(false);
  isVerified = signal(false);
  errorMessage = signal('');
  userId = signal<string>('');
  token = signal<string>('');

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
        this.errorMessage.set('auth.errors.invalid_verification_link');
        return;
      }

      const cleanUrl = `/email?id=${id}&token=${token}`;
      this.location.replaceState(cleanUrl);

      this.userId.set(id);
      this.token.set(token);
      this.verifyEmail();
    });
  }

  verifyEmail(): void {
    this.isVerifying.set(true);
    this.errorMessage.set('');

    const id = this.userId();
    const token = this.token();

    if (!id || !token) {
      this.errorMessage.set('auth.errors.invalid_verification_link');
      this.isVerifying.set(false);
      return;
    }

    this.authService.completeRegistration(id, token, true).subscribe({
      next: () => {
        this.isVerifying.set(false);
        this.isVerified.set(true);
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },
      error: (error) => {
        this.isVerifying.set(false);
        this.errorMessage.set(error.message || 'auth.errors.verification_failed');
      },
    });
  }

  resendEmail(): void {
    this.router.navigate(['/register']);
  }
}
