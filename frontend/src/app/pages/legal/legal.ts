import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

type LegalTab = 'terms' | 'privacy' | 'cookies';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './legal.html',
  styleUrl: './legal.css',
})
export class Legal {
  activeTab = signal<LegalTab>('terms');

  setTab(tab: LegalTab): void {
    this.activeTab.set(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
