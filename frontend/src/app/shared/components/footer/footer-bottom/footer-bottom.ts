import { Component } from '@angular/core';
import { IconBtn } from '../../icon-btn/icon-btn';
import { ICONS, IMAGES } from '../../../../core/constants/visuals';
import { PrimaryBtn } from '../../primary-btn/primary-btn';

@Component({
  selector: 'app-footer-bottom',
  standalone: true,
  imports: [IconBtn, PrimaryBtn],
  templateUrl: './footer-bottom.html',
  styleUrl: './footer-bottom.css',
})
export class FooterBottom {
  ICONS = ICONS;
  IMAGES = IMAGES;
}
