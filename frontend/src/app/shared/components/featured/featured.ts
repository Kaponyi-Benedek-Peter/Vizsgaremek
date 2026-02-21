import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-featured',
  imports: [TranslateModule],
  templateUrl: './featured.html',
  styleUrl: './featured.css',
})
export class Featured {
  constructor() {}
}
