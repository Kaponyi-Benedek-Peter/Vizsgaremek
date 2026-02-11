import { NgFor } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HERO_SLIDES, NAV_ICONS } from '../../../core/constants/visuals';

@Component({
  selector: 'app-slide',
  imports: [NgFor],
  templateUrl: './slide.html',
  styleUrl: './slide.css',
})
export class Slide implements OnInit, OnDestroy {
  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES - central config
  // ═══════════════════════════════════════════════════════════════════════════
  slides = HERO_SLIDES; // visuals.ts

  // ═══════════════════════════════════════════════════════════════════════════
  // NAVIGATION ICONS - (Unicode)
  // ═══════════════════════════════════════════════════════════════════════════
  prevIcon = NAV_ICONS.arrowLeft; // '‹'
  nextIcon = NAV_ICONS.arrowRight; // '›'

  // ═══════════════════════════════════════════════════════════════════════════
  // STATE
  // ═══════════════════════════════════════════════════════════════════════════
  currentIndex = 0;
  isPaused = false;
  private intervalId: any = null;

  // ═══════════════════════════════════════════════════════════════════════════
  // LIFECYCLE HOOKS
  // ═══════════════════════════════════════════════════════════════════════════

  ngOnInit(): void {
    console.log('🎬 Slide component initialized');
    console.log('   Total slides:', this.slides.length);
    console.log('   First slide:', this.slides[0]);

    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
    console.log('🎬 Slide component destroyed');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // AUTOPLAY CONTROL
  // ═══════════════════════════════════════════════════════════════════════════

  private startAutoplay(): void {
    this.stopAutoplay();

    this.intervalId = setInterval(() => {
      if (!this.isPaused) {
        this.next();
      }
    }, 5000);
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

  // ═══════════════════════════════════════════════════════════════════════════
  // NAVIGATION
  // ═══════════════════════════════════════════════════════════════════════════

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    // console.log('→ Slide', this.currentIndex);
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    // console.log('← Slide', this.currentIndex);
  }

  goTo(index: number): void {
    this.currentIndex = index;
    // console.log('◎ Jumped to slide', this.currentIndex);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // HELPERS
  // ═══════════════════════════════════════════════════════════════════════════

  getBackgroundImageUrl(): string {
    return `url(${this.slides[this.currentIndex].image})`;
  }

  isActive(index: number): boolean {
    return this.currentIndex === index;
  }
}
