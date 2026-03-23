import { Component, Input, Output, EventEmitter, inject } from '@angular/core';

import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Post } from '../../../core/models/forum.model';
import { ForumService } from '../../../core/services/forum.service';
import { ICONS } from '../../../core/constants/visuals';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [RouterModule, TranslateModule],
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
    // category_id alapján keres (nem category — az nem létezik a Post modellben)
    return this.forumService.categories().find((cat) => cat.id === this.post.category_id);
  }

  // author_role nincs a DB-ben — user_id alapján nem tudunk szerepet meghatározni,
  // a badge-et a backend oldal bővítésekor lehet majd visszahozni
  get authorBadgeClass(): string {
    return 'badge-user';
  }

  getRelativeTime(): string {
    const now = new Date();
    const postDate = new Date(this.post.created_at);
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
      return this.translateService.instant('time.weeks_ago', { count: Math.floor(diffDays / 7) });
    } else if (diffDays < 365) {
      return this.translateService.instant('time.months_ago', { count: Math.floor(diffDays / 30) });
    } else {
      return this.translateService.instant('time.years_ago', { count: Math.floor(diffDays / 365) });
    }
  }

  handleCardClick(): void {
    this.cardClick.emit(this.post);
  }
}
