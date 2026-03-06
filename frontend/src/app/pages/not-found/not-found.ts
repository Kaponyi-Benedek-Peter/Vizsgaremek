import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { ThemeService, Theme } from '../../core/services/theme.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound implements OnInit, OnDestroy {
  private themeService = inject(ThemeService);
  private themeSub!: Subscription;

  currentTheme = signal<Theme>('light');

  private readonly ASSETS = environment.assetsURL;

  get logoSrc(): string {
    return this.currentTheme() === 'dark'
      ? `${this.ASSETS}/assets/icons/ROYS_SHACK_WHITE_NF.webp`
      : `${this.ASSETS}/assets/icons/ROYS_SHACK_BLACK_NF.webp`;
  }

  ngOnInit(): void {
    this.currentTheme.set(this.themeService.getCurrentTheme());
    this.themeSub = this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme.set(theme);
    });
  }

  ngOnDestroy(): void {
    this.themeSub?.unsubscribe();
  }
}
