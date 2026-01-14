import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer-column',
  imports: [],
  templateUrl: './footer-column.html',
  styleUrl: './footer-column.css',
})
export class FooterColumn {
  @Input() title!: string;
}
