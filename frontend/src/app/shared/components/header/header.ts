import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { PrimaryBtn } from '../primary-btn/primary-btn';
import { IconBtn } from '../icon-btn/icon-btn';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { ICONS, IMAGES } from '../../../core/constants/visuals';
import { ThemeService, Theme } from '../../../core/services/theme.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/auth.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PrimaryBtn, IconBtn, RouterModule, LanguageSwitcher, TranslateModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  ICONS = ICONS;
  IMAGES = IMAGES;
  currentTheme: Theme = 'light';
  isAuthenticated = false;
  currentUser: User | null = null;

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
    this.authService.authState$.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.currentUser = state.user;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  logout(): void {
    this.authService.logout();
  }
}
