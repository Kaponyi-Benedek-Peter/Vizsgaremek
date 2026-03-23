import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';

import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { ThemeService, Theme } from '../../core/services/theme.service';
import { environment } from '../../../environments/environment';
import { getLogoSrc } from '../../core/constants/visuals';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound implements OnInit, OnDestroy {
  private themeService = inject(ThemeService);
  private themeSub!: Subscription;

  currentTheme = signal<Theme>('light');

  get logoSrc(): string {
    return getLogoSrc(this.currentTheme() as 'dark' | 'light');
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
