import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { PrimaryBtn } from '../primary-btn/primary-btn';
import { IconBtn } from '../icon-btn/icon-btn';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { ICONS, IMAGES } from '../../../core/constants/visuals';
import { ThemeService, Theme } from '../../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PrimaryBtn, IconBtn, RouterModule, LanguageSwitcher, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  ICONS = ICONS;
  IMAGES = IMAGES;
  currentTheme: Theme = 'light';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
