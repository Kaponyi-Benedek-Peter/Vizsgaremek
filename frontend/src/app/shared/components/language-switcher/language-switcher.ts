import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';

interface Language {
  code: string;
  name: string;
  flagImage: string;
}

@Component({
  selector: 'app-language-switcher',
  imports: [NgIf, NgFor],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class LanguageSwitcher {
  isOpen = false;
  currentLanguage = 'hu';

  languages: Language[] = [
    {
      code: 'en',
      name: 'Angol',
      flagImage: 'assets/images/English.png',
    },
    {
      code: 'hu',
      name: 'Magyar',
      flagImage: 'assets/images/Hungary.png',
    },
    {
      code: 'de',
      name: 'Német',
      flagImage: 'assets/images/German.png',
    },
  ];

  globeImage = 'assets/images/flags/globe.png';

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
    }
  }

  get currentLang(): Language {
    return this.languages.find((lang) => lang.code === this.currentLanguage) || this.languages[0];
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectLanguage(langCode: string): void {
    this.currentLanguage = langCode;
    this.isOpen = false;

    localStorage.setItem('preferredLanguage', langCode);

    console.log('Nyelv váltás:', langCode);
  }

  onImageError(event: any, langCode: string): void {
    event.target.style.display = 'none';
    event.target.parentElement.innerHTML = `<span class="fallback-text">${langCode.toUpperCase()}</span>`;
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
