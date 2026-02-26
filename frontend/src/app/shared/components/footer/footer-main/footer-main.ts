import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NewsletterForm } from '../newsletter-form/newsletter-form';

@Component({
  selector: 'app-footer-main',
  standalone: true,
  imports: [NewsletterForm, TranslateModule],
  templateUrl: './footer-main.html',
  styleUrl: './footer-main.css',
})
export class FooterMain {}
