import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HERO_SLIDES } from '../../../core/constants/visuals';

@Component({
  selector: 'app-slide',
  standalone: true,
  imports: [TranslateModule, RouterModule],
  templateUrl: './slide.html',
  styleUrl: './slide.css',
})
export class Slide implements OnInit, OnDestroy {
  slides = HERO_SLIDES;

  currentIndex = 0;
  previousIndex = -1;
  isPaused = false;
  readonly autoplayDuration = 5000;

  private intervalId: any = null;

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  private startAutoplay(): void {
    this.stopAutoplay();
    this.intervalId = setInterval(() => {
      if (!this.isPaused) {
        this.next();
      }
    }, this.autoplayDuration);
  }

  private stopAutoplay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  pause(): void {
    this.isPaused = true;
  }

  resume(): void {
    this.isPaused = false;
  }

  next(): void {
    this.previousIndex = this.currentIndex;
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prev(): void {
    this.previousIndex = this.currentIndex;
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  goTo(index: number): void {
    if (index === this.currentIndex) return;
    this.previousIndex = this.currentIndex;
    this.currentIndex = index;
    this.startAutoplay();
  }

  isActive(index: number): boolean {
    return this.currentIndex === index;
  }

  isPrevious(index: number): boolean {
    return this.previousIndex === index;
  }
}
