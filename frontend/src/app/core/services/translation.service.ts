import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

export type SupportedLanguage = 'hu' | 'en' | 'de';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLangSubject = new BehaviorSubject<SupportedLanguage>(
    (localStorage.getItem('preferredLanguage') as SupportedLanguage) || 'en',
  );
  public currentLang$ = this.currentLangSubject.asObservable();

  constructor(private translate: TranslateService) {
    this.initLanguage();
  }

  private initLanguage(): void {
    const defaultLang: SupportedLanguage = 'en';
    const supportedLangs: SupportedLanguage[] = ['hu', 'en', 'de'];

    this.translate.addLangs(supportedLangs);
    this.translate.setDefaultLang(defaultLang);

    const savedLang = this.getSavedLanguage();
    const langToUse = savedLang || defaultLang;

    this.setLanguage(langToUse);
  }

  public setLanguage(lang: SupportedLanguage): void {
    this.translate.use(lang);
    this.currentLangSubject.next(lang);
    this.saveLanguage(lang);
  }

  public getCurrentLanguage(): SupportedLanguage {
    return this.currentLangSubject.value;
  }

  private saveLanguage(lang: SupportedLanguage): void {
    localStorage.setItem('preferredLanguage', lang);
  }

  private getSavedLanguage(): SupportedLanguage | null {
    const saved = localStorage.getItem('preferredLanguage');
    return saved as SupportedLanguage | null;
  }

  public instant(key: string): string {
    return this.translate.instant(key);
  }
}
