import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ForumBlogService } from '../../core/services/forum-blog.service';
import { Post, BlogPost, POST_CATEGORIES, CategoryInfo } from '../../core/models/forum-blog.model';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.css',
})
export class BlogDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private forumBlogService = inject(ForumBlogService);
  private translate = inject(TranslateService);

  post = signal<Post | null>(null);
  relatedPosts = signal<Post[]>([]);
  isLoading = signal(true);
  contentExpanded = signal(false);

  categories = POST_CATEGORIES;

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadPost(slug);
    }
  }

  private loadPost(slug: string): void {
    this.isLoading.set(true);
    this.forumBlogService.getPostById(slug).subscribe((post) => {
      this.post.set(post);
      this.isLoading.set(false);

      if (post) {
        this.forumBlogService.getRelatedPosts(post.id, 3).subscribe((related) => {
          this.relatedPosts.set(related);
        });
      }
    });
  }

  getCategoryInfo(categoryId: string): CategoryInfo | undefined {
    return this.categories.find((c) => c.id === categoryId);
  }

  getReadingTime(): number {
    const p = this.post();
    if (p && 'readingTime' in p) {
      return (p as BlogPost).readingTime;
    }
    return 0;
  }

  formatDate(date: Date): string {
    if (!date) return '';
    return new Intl.DateTimeFormat(this.translate.currentLang || 'hu', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  }

  toggleContent(): void {
    this.contentExpanded.update((v) => !v);
  }
}
