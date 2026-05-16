import { Component, signal } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './featured.html',
  styleUrl: './featured.css',
})
export class Featured {
  showAll = signal(false);

  toggleShowAll(): void {
    this.showAll.set(!this.showAll());
  }
}
