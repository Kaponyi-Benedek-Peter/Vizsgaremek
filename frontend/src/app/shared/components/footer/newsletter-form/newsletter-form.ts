import { Component, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { ICONS, IMAGES, LANGUAGE_OPTIONS } from '../../../../core/constants/visuals';
import { environment } from '../../../../../environments/environment';
import { ToastService } from '../../../../core/services/toast.service';
import {
  TranslationService,
  SupportedLanguage,
} from '../../../../core/services/translation.service';
import { toSignal } from '@angular/core/rxjs-interop';

// Backend által várt language értékek
const LANG_TO_BACKEND: Record<SupportedLanguage, string> = {
  hu: 'hungarian',
  en: 'english',
  de: 'german',
};

interface SocialLink {
  name: string;
  icon: string;
  url: string | null;
}

@Component({
  selector: 'app-newsletter-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, NgFor, NgIf],
  templateUrl: './newsletter-form.html',
  styleUrl: './newsletter-form.css',
})
export class NewsletterForm {
  private http = inject(HttpClient);
  private toastService = inject(ToastService);
  private translationService = inject(TranslationService);
  private readonly API_URL = environment.baseURL;
  private toBase64(str: string): string {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return btoa(binary);
  }

  ICONS = ICONS;
  IMAGES = IMAGES;

  email = '';
  isSubmitting = false;
  isLangDropdownOpen = false;
  activeSocialTooltip: string | null = null;

  // current language as default language
  selectedLang = toSignal(this.translationService.currentLang$, {
    initialValue: this.translationService.getCurrentLanguage(),
  });

  // writeable signal for the newsletter language
  newsletterLang: SupportedLanguage = this.translationService.getCurrentLanguage();

  // languages from visuals.ts
  readonly languages = LANGUAGE_OPTIONS;

  socialLinks: SocialLink[] = [
    { name: 'Facebook', icon: ICONS.facebook, url: null },
    { name: 'Instagram', icon: ICONS.instagram, url: null },
    { name: 'X (Twitter)', icon: ICONS.x, url: null },
  ];

  get currentLangOption() {
    return this.languages.find((l) => l.code === this.newsletterLang) ?? this.languages[0];
  }

  toggleLangDropdown(): void {
    this.isLangDropdownOpen = !this.isLangDropdownOpen;
  }

  selectNewsletterLang(code: SupportedLanguage): void {
    this.newsletterLang = code;
    this.isLangDropdownOpen = false;
  }

  toggleSocialTooltip(name: string): void {
    this.activeSocialTooltip = this.activeSocialTooltip === name ? null : name;
    if (this.activeSocialTooltip) {
      setTimeout(() => {
        if (this.activeSocialTooltip === name) {
          this.activeSocialTooltip = null;
        }
      }, 3000);
    }
  }

  trackByLangCode(index: number, lang: any) {
    return lang.code;
  }

  trackBySocialName(index: number, social: any) {
    return social.name;
  }

  onSubmit(): void {
    if (!this.email || this.isSubmitting) return;

    this.isSubmitting = true;

    const payload = {
      email: this.toBase64(this.email),
      news_level: btoa('1'),
      language: LANG_TO_BACKEND[this.newsletterLang],
    };

    this.http
      .post<{
        statuscode: string;
        status: string;
      }>(`${this.API_URL}/api/newsletter_subscription`, payload)
      .subscribe({
        next: (response) => {
          if (response.statuscode === '200') {
            this.toastService.show('footer.newsletter_success', 'success');
            this.email = '';
          } else {
            this.toastService.show('footer.newsletter_error', 'error');
          }
          this.isSubmitting = false;
        },
        error: () => {
          this.toastService.show('footer.newsletter_error', 'error');
          this.isSubmitting = false;
        },
      });
  }
}
