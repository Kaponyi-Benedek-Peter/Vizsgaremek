import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './featured.html',
  styleUrl: './featured.css',
})
export class Featured {
  showAll = signal(false);

  toggleShowAll(): void {
    this.showAll.set(!this.showAll());
  }
}
