import { Component, ElementRef, HostListener, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  imports: [TranslateModule],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class LanguageSwitcher implements OnInit {
  private elementRef = inject(ElementRef);
  private translationService = inject(TranslationService);
  private destroyRef = inject(DestroyRef);

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

  ngOnInit(): void {
    this.translationService.currentLang$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((lang) => {
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
