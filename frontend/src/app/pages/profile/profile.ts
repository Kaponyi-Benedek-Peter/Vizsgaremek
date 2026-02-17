import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  user = this.authService.currentUser;
  isAuthenticated = this.authService.isAuthenticated;

  fullName = computed(() => {
    const userData = this.user();
    if (!userData) return '';
    return `${userData.firstname} ${userData.lastname}`.trim();
  });

  email = computed(() => this.user()?.email || '');

  ngOnInit(): void {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToSettings(): void {
    console.log('Settings not yet implemented');
  }
}
