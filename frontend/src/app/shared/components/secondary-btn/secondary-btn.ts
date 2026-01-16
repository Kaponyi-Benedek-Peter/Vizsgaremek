import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-secondary-btn',
  standalone: true,
  imports: [],
  templateUrl: './secondary-btn.html',
  styleUrl: './secondary-btn.css',
})
export class SecondaryBtn {
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
