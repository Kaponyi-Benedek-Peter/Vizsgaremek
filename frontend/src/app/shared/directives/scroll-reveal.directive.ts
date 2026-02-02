import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

export type AnimationType = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'fade-scale';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit {
  @Input() animationType: AnimationType = 'fade-scale';
  @Input() animationDelay: number = 0;
  @Input() animationDuration: number = 600;
  @Input() threshold: number = 0.1; // Mennyit lásson az elemből, hogy aktiválódjon (0-1)

  private hasAnimated = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.setupElement();
    this.checkVisibility();
  }

  private setupElement(): void {
    const element = this.el.nativeElement as HTMLElement;
    
    // Alapértelmezett rejtett állapot
    element.style.opacity = '0';
    element.style.transition = `all ${this.animationDuration}ms ease`;
    element.style.transitionDelay = `${this.animationDelay}ms`;

    // Animáció típus szerinti kezdő pozíció
    switch (this.animationType) {
      case 'fade':
        // Csak opacity
        break;
      case 'slide-up':
        element.style.transform = 'translateY(50px)';
        break;
      case 'slide-down':
        element.style.transform = 'translateY(-50px)';
        break;
      case 'slide-left':
        element.style.transform = 'translateX(50px)';
        break;
      case 'slide-right':
        element.style.transform = 'translateX(-50px)';
        break;
      case 'scale':
        element.style.transform = 'scale(0.8)';
        break;
      case 'fade-scale':
        element.style.transform = 'translateY(30px) scale(0.95)';
        break;
    }
  }

  @HostListener('window:scroll', [])
  @HostListener('window:resize', [])
  onWindowEvent(): void {
    this.checkVisibility();
  }

  private checkVisibility(): void {
    if (this.hasAnimated) {
      return;
    }

    const element = this.el.nativeElement as HTMLElement;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Elem láthatóságának ellenőrzése
    const elementHeight = rect.height;
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const visibilityRatio = visibleHeight / elementHeight;

    if (visibilityRatio >= this.threshold && rect.top < windowHeight) {
      this.reveal();
    }
  }

  private reveal(): void {
    this.hasAnimated = true;
    const element = this.el.nativeElement as HTMLElement;
    
    element.style.opacity = '1';
    element.style.transform = 'translateY(0) translateX(0) scale(1)';
  }

  // Public metódus az animáció resetelésére (opcionális)
  public reset(): void {
    this.hasAnimated = false;
    this.setupElement();
  }
}
