import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-btn',
  imports: [],
  templateUrl: './icon-btn.html',
  styleUrl: './icon-btn.css',
})
export class IconBtn {
  @Input() iconImg!: string;
}
