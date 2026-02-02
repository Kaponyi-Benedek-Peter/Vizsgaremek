import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

export type SupportedLanguage = 'hu' | 'en' | 'de';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLangSubject = new BehaviorSubject<SupportedLanguage>('hu');
  public currentLang$ = this.currentLangSubject.asObservable();

  constructor(private translate: TranslateService) {
    this.initLanguage();
  }

  private initLanguage(): void {
    // Alapértelmezett és támogatott nyelvek
    const defaultLang: SupportedLanguage = 'hu';
    const supportedLangs: SupportedLanguage[] = ['hu', 'en', 'de'];

    this.translate.addLangs(supportedLangs);
    this.translate.setDefaultLang(defaultLang);

    // Elmentett nyelv betöltése localStorage-ból
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

  // Fordítás lekérése (opcionális, közvetlen használatra)
  public instant(key: string): string {
    return this.translate.instant(key);
  }
}
