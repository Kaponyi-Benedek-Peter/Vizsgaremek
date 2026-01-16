import { Component } from '@angular/core';
import { FooterBottom } from './footer-bottom/footer-bottom';
import { FooterMain } from './footer-main/footer-main';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FooterBottom, FooterMain],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {}
