import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NewsletterForm } from '../newsletter-form/newsletter-form';

@Component({
  selector: 'app-footer-main',
  standalone: true,
  imports: [TranslatePipe, NewsletterForm],
  templateUrl: './footer-main.html',
  styleUrl: './footer-main.css',
})
export class FooterMain {
  readonly currentYear = new Date().getFullYear();
}
