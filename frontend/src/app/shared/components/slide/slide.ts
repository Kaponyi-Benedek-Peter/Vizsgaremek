import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-slide',
  imports: [NgFor],
  templateUrl: './slide.html',
  styleUrl: './slide.css',
})
export class Slide {
  slides = [{ image: '' }, { image: '' }, { image: '' }, { image: '' }, { image: '' }];

  currentIndex = 0;
  isPaused = false;
  intervalId: any;

  ngOnInit() {
    this.startAutoplay();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
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
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  goTo(index: number) {
    this.currentIndex = index;
  }
}
