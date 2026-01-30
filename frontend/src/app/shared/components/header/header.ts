import { Component } from '@angular/core';
import { PrimaryBtn } from '../primary-btn/primary-btn';
import { IconBtn } from '../icon-btn/icon-btn';
import { RouterModule } from '@angular/router';
import { ICONS, IMAGES } from '../../../core/constants/visuals';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PrimaryBtn, IconBtn, RouterModule, LanguageSwitcher],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  ICONS = ICONS;
  IMAGES = IMAGES;
}
