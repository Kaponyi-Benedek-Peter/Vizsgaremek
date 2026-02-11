import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  isVerifying = signal(false);
  isVerified = signal(false);
  errorMessage = signal('');
  sessionToken = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      if (token) {
        this.sessionToken.set(token);
        this.verifyEmail(token);
      }
    });
  }

  verifyEmail(token: string): void {
    this.isVerifying.set(true);
    this.errorMessage.set('');

    const userId = this.route.snapshot.queryParams['id'] || '';

    this.authService.completeRegistration(userId, token).subscribe({
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
    // This would need to be implemented in the backend
    // For now, just redirect to register
    this.router.navigate(['/register']);
  }
}
