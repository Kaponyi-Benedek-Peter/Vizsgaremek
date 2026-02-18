import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Post, POST_CATEGORIES } from '../../../core/models/forum-blog.model';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './post-card.html',
  styleUrl: './post-card.css',
})
export class PostCardComponent {
  @Input({ required: true }) post!: Post;
  @Input() showExcerpt = true;
  @Input() showImage = true;
  @Input() showCategory = true;
  @Input() showAuthor = true;
  @Input() showStats = true;
  @Input() compactMode = false;

  @Output() cardClick = new EventEmitter<Post>();

  private translateService = inject(TranslateService);

  get categoryInfo() {
    return POST_CATEGORIES.find((cat) => cat.id === this.post.category);
  }

  get authorBadgeClass(): string {
    switch (this.post.author.role) {
      case 'admin':
        return 'badge-admin';
      case 'pharmacist':
        return 'badge-pharmacist';
      case 'user':
        return 'badge-user';
      default:
        return '';
    }
  }

  getRelativeTime(): string {
    const now = new Date();
    const postDate = this.post.createdAt;
    const diffMs = now.getTime() - postDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return this.translateService.instant('time.minutes_ago', { count: diffMinutes });
      }
      return this.translateService.instant('time.hours_ago', { count: diffHours });
    } else if (diffDays === 1) {
      return this.translateService.instant('time.yesterday');
    } else if (diffDays < 7) {
      return this.translateService.instant('time.days_ago', { count: diffDays });
    } else if (diffDays < 30) {
      const diffWeeks = Math.floor(diffDays / 7);
      return this.translateService.instant('time.weeks_ago', { count: diffWeeks });
    } else if (diffDays < 365) {
      const diffMonths = Math.floor(diffDays / 30);
      return this.translateService.instant('time.months_ago', { count: diffMonths });
    } else {
      const diffYears = Math.floor(diffDays / 365);
      return this.translateService.instant('time.years_ago', { count: diffYears });
    }
  }

  handleCardClick(): void {
    this.cardClick.emit(this.post);
  }

  get readingTime(): number | null {
    return this.post.type === 'blog' ? this.post.readingTime : null;
  }

  get isQuestion(): boolean {
    return this.post.type === 'forum' ? this.post.isQuestion : false;
  }

  get hasAcceptedAnswer(): boolean {
    return this.post.type === 'forum' ? this.post.hasAcceptedAnswer : false;
  }
}
