import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-primary-btn',
  standalone: true,
  imports: [],
  templateUrl: './primary-btn.html',
  styleUrl: './primary-btn.css',
})
export class PrimaryBtn {
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
