import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

export type AnimationType =
  | 'fade'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale'
  | 'fade-scale';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit {
  @Input() animationType: AnimationType = 'fade-scale';
  @Input() animationDelay: number = 0;
  @Input() animationDuration: number = 600;
  @Input() threshold: number = 0.1;
  @Input() autoPlay: boolean = false;

  private hasAnimated = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.setupElement();

    if (this.autoPlay) {
      setTimeout(() => {
        this.reveal();
      }, 50);
    } else {
      this.checkVisibility();
    }
  }

  private setupElement(): void {
    const element = this.el.nativeElement as HTMLElement;

    element.style.opacity = '0';
    element.style.transition = `all ${this.animationDuration}ms ease`;
    element.style.transitionDelay = `${this.animationDelay}ms`;

    switch (this.animationType) {
      case 'fade':
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
    if (this.autoPlay) {
      return;
    }
    this.checkVisibility();
  }

  private checkVisibility(): void {
    if (this.hasAnimated) {
      return;
    }

    const element = this.el.nativeElement as HTMLElement;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const elementHeight = rect.height;
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const visibilityRatio = visibleHeight / elementHeight;

    if (visibilityRatio >= this.threshold && rect.top < windowHeight) {
      this.reveal();
    }
  }

  private reveal(): void {
    if (this.hasAnimated) {
      return;
    }

    const element = this.el.nativeElement as HTMLElement;

    element.style.opacity = '1';
    element.style.transform = 'translateY(0) translateX(0) scale(1)';

    this.hasAnimated = true;
  }
}
