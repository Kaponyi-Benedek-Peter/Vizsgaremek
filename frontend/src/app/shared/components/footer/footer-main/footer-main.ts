import { Component } from '@angular/core';
import { NewsletterForm } from '../newsletter-form/newsletter-form';
import { FooterColumn } from '../footer-column/footer-column';

@Component({
  selector: 'app-footer-main',
  standalone: true,
  imports: [NewsletterForm, FooterColumn],
  templateUrl: './footer-main.html',
  styleUrl: './footer-main.css',
})
export class FooterMain {}
