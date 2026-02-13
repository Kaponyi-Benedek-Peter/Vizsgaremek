import { Component } from '@angular/core';
import { PrimaryBtn } from '../../shared/components/primary-btn/primary-btn';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-test',
  imports: [PrimaryBtn, TranslateModule],
  templateUrl: './test.html',
  styleUrl: './test.css',
})
export class Test {}
