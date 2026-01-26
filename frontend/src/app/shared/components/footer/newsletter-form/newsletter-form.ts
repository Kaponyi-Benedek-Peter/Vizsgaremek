import { Component } from '@angular/core';
import { ICONS, IMAGES } from '../../../../core/constants/visuals';

@Component({
  selector: 'app-newsletter-form',
  standalone: true,
  imports: [],
  templateUrl: './newsletter-form.html',
  styleUrl: './newsletter-form.css',
})
export class NewsletterForm {
  ICONS = ICONS;
  IAMGES = IMAGES;
}
