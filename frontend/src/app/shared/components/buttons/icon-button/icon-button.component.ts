import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-button.component',
  imports: [],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.css',
})
export class IconButtonComponent {
  @Input() iconSrc: string = '';
  @Input() altText: string = 'icon';
}
