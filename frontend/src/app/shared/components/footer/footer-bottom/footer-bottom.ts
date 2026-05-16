import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { IconBtn } from '../../icon-btn/icon-btn';
import { PrimaryBtn } from '../../primary-btn/primary-btn';
import { ICONS, IMAGES } from '../../../../core/constants/visuals';

@Component({
  selector: 'app-footer-bottom',
  standalone: true,
  imports: [IconBtn, PrimaryBtn, RouterModule, TranslatePipe],
  templateUrl: './footer-bottom.html',
  styleUrl: './footer-bottom.css',
})
export class FooterBottom {
  ICONS = ICONS;
  IMAGES = IMAGES;
}
