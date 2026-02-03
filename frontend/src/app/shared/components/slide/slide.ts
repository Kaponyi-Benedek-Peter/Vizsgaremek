import { NgFor } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-slide',
  imports: [NgFor],
  templateUrl: './slide.html',
  styleUrl: './slide.css',
})
export class Slide implements OnInit, OnDestroy {
  slides = [
    { image: 'assets/images/hero1.png' },
    { image: 'assets/images/hero2.png' },
    { image: 'assets/images/hero3.png' },
    { image: 'assets/images/hero4.png' },
  ];

  currentIndex = 0;
  isPaused = false;
  intervalId: any;

  ngOnInit() {
    console.log('=== SLIDE COMPONENT DEBUG ===');
    console.log('Slides array:', this.slides);
    console.log('Current index:', this.currentIndex);
    console.log('Current slide:', this.slides[this.currentIndex]);
    console.log('Current image URL:', this.slides[this.currentIndex]?.image);
    console.log('Background image string:', `url(${this.slides[this.currentIndex]?.image})`);

    this.startAutoplay();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startAutoplay() {
    this.intervalId = setInterval(() => {
      if (!this.isPaused) {
        this.next();
      }
    }, 5000);
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    console.log('Moved to slide:', this.currentIndex);
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    console.log('Moved to slide:', this.currentIndex);
  }

  goTo(index: number) {
    this.currentIndex = index;
    console.log('Jumped to slide:', this.currentIndex);
  }

  getBackgroundImageUrl(): string {
    return `url(${this.slides[this.currentIndex].image})`;
  }
}
