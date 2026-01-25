import { Component } from '@angular/core';
import { IconBtn } from '../../icon-btn/icon-btn';
import { ICONS, IMAGES } from '../../../../core/constants/visuals';

@Component({
  selector: 'app-newsletter-form',
  standalone: true,
  imports: [IconBtn],
  templateUrl: './newsletter-form.html',
  styleUrl: './newsletter-form.css',
})
export class NewsletterForm {
  ICONS = ICONS;
  IAMGES = IMAGES;
}
