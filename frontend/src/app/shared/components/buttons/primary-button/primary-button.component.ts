import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-primary-button.component',
  imports: [],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.css',
})
export class PrimaryButtonComponent {
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
