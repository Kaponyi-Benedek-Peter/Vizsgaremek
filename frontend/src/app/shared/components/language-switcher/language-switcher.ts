import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService, SupportedLanguage } from '../../../core/services/translation.service';
import { environment } from '../../../../environments/environment';

interface Language {
  code: SupportedLanguage;
  name: string;
  flagImage: string;
  imageError: boolean;
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [NgIf, NgFor, TranslateModule],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class LanguageSwitcher implements OnInit {
  isOpen = false;
  currentLanguage: SupportedLanguage = 'en';

  languages: Language[] = [
    {
      code: 'en',
      name: 'English',
      flagImage: `${environment.assetsURL}/assets/images/English.webp`,
      imageError: false,
    },
    {
      code: 'hu',
      name: 'Magyar',
      flagImage: `${environment.assetsURL}/assets/images/Hungary.webp`,
      imageError: false,
    },
    {
      code: 'de',
      name: 'Deutsch',
      flagImage: `${environment.assetsURL}/assets/images/German.webp`,
      imageError: false,
    },
  ];

  constructor(
    private elementRef: ElementRef,
    private translationService: TranslationService,
  ) {}

  ngOnInit(): void {
    this.translationService.currentLang$.subscribe((lang) => {
      this.currentLanguage = lang;
    });
  }

  get currentLang(): Language {
    return this.languages.find((l) => l.code === this.currentLanguage) || this.languages[1];
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectLanguage(langCode: SupportedLanguage): void {
    this.translationService.setLanguage(langCode);
    this.isOpen = false;
  }

  onImageError(langCode: string): void {
    this.languages = this.languages.map((l) =>
      l.code === langCode ? { ...l, imageError: true } : l,
    );
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.isOpen = false;
  }
}
