import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { TranslationService, SupportedLanguage } from '../../../core/services/translation.service';
import { isEmoji, LANGUAGE_OPTIONS } from '../../../core/constants/visuals';

interface Language {
  code: SupportedLanguage;
  name: string;
  flagImage: string;
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class LanguageSwitcher implements OnInit {
  isOpen = false;
  currentLanguage: SupportedLanguage = 'hu';

  languages = LANGUAGE_OPTIONS;
  isEmoji = isEmoji;

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
    return this.languages.find((lang) => lang.code === this.currentLanguage) || this.languages[1];
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectLanguage(langCode: SupportedLanguage): void {
    this.translationService.setLanguage(langCode);
    this.isOpen = false;
  }

  onImageError(event: any, langCode: string): void {
    event.target.style.display = 'none';
    const fallbackSpan = document.createElement('span');
    fallbackSpan.className = 'fallback-text';
    fallbackSpan.textContent = langCode.toUpperCase();
    event.target.parentElement.appendChild(fallbackSpan);
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
