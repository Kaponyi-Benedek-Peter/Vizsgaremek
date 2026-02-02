import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentThemeSubject = new BehaviorSubject<Theme>('light');
  public currentTheme$ = this.currentThemeSubject.asObservable();

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    const savedTheme = this.getSavedTheme();
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const themeToUse = savedTheme || (prefersDark ? 'dark' : 'light');
    this.setTheme(themeToUse);
  }

  public setTheme(theme: Theme): void {
    this.currentThemeSubject.next(theme);
    this.applyTheme(theme);
    this.saveTheme(theme);
  }

  public toggleTheme(): void {
    const newTheme = this.currentThemeSubject.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  public getCurrentTheme(): Theme {
    return this.currentThemeSubject.value;
  }

  private applyTheme(theme: Theme): void {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-theme', theme);
  }

  private saveTheme(theme: Theme): void {
    localStorage.setItem('preferredTheme', theme);
  }

  private getSavedTheme(): Theme | null {
    const saved = localStorage.getItem('preferredTheme');
    return saved as Theme | null;
  }
}
