import { Component } from '@angular/core';
import { NewsletterForm } from '../newsletter-form/newsletter-form';

@Component({
  selector: 'app-footer-main',
  standalone: true,
  imports: [NewsletterForm],
  templateUrl: './footer-main.html',
  styleUrl: './footer-main.css',
})
export class FooterMain {}
