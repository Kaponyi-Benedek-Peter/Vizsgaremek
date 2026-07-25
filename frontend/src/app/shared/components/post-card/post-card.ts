import { Component, Input, Output, EventEmitter, inject } from '@angular/core';

import { RouterModule } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Post } from '../../../core/models/forum.model';
import { ForumService } from '../../../core/services/forum.service';
import { ICONS } from '../../../core/constants/visuals';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [RouterModule, TranslatePipe],
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

  readonly ICONS = ICONS;

  private translateService = inject(TranslateService);
  private forumService = inject(ForumService);

  get categoryInfo() {
    return this.forumService.categories().find((cat) => cat.id === this.post.category_id);
  }

  get authorBadgeClass(): string {
    return 'badge-user';
  }

  getRelativeTime(): string {
    if (!this.post.created_at) {
      return 'Unknown date';
    }

    // Safari-safe parse
    const safeDate = this.post.created_at.replace(' ', 'T');
    const postDate = new Date(safeDate);

    if (isNaN(postDate.getTime())) {
      return 'Unknown date';
    }

    const now = new Date();
    const diffMs = now.getTime() - postDate.getTime();

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) {
      return 'Just now';
    }

    if (diffHours < 1) {
      return this.translateService.instant('time.minutes_ago', {
        count: diffMinutes,
      });
    }

    if (diffDays < 1) {
      return this.translateService.instant('time.hours_ago', {
        count: diffHours,
      });
    }

    if (diffDays === 1) {
      return this.translateService.instant('time.yesterday');
    }

    if (diffDays < 7) {
      return this.translateService.instant('time.days_ago', {
        count: diffDays,
      });
    }

    if (diffDays < 30) {
      return this.translateService.instant('time.weeks_ago', {
        count: Math.floor(diffDays / 7),
      });
    }

    if (diffDays < 365) {
      return this.translateService.instant('time.months_ago', {
        count: Math.floor(diffDays / 30),
      });
    }

    return this.translateService.instant('time.years_ago', {
      count: Math.floor(diffDays / 365),
    });
  }

  handleCardClick(): void {
    this.cardClick.emit(this.post);
  }

  hideImg(event: Event): void {
    const img = event.target as HTMLImageElement;

    img.style.display = 'none';

    const parent = img.parentElement;

    if (parent) {
      parent.style.display = 'none';
    }
  }
}
