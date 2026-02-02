import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ICONS, IMAGES } from '../../../../core/constants/visuals';

@Component({
  selector: 'app-newsletter-form',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: './newsletter-form.html',
  styleUrl: './newsletter-form.css',
})
export class NewsletterForm {
  ICONS = ICONS;
  IMAGES = IMAGES;
  email = '';

  onSubmit(): void {
    if (this.email) {
      console.log('Newsletter feliratkozás:', this.email);
      // TODO: Backend API hívás
      this.email = '';
    }
  }
}
