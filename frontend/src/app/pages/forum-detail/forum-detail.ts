import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ForumBlogService } from '../../core/services/forum-blog.service';
import { AuthService } from '../../core/services/auth.service';
import {
  Post,
  BlogPost,
  Comment,
  POST_CATEGORIES,
  CategoryInfo,
} from '../../core/models/forum-blog.model';

@Component({
  selector: 'app-forum-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslateModule],
  templateUrl: './forum-detail.html',
  styleUrl: './forum-detail.css',
})
export class ForumDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private forumBlogService = inject(ForumBlogService);
  private authService = inject(AuthService);
  private translate = inject(TranslateService);

  post = signal<Post | null>(null);
  relatedPosts = signal<Post[]>([]);
  comments = signal<Comment[]>([]);
  isLoading = signal(true);
  contentExpanded = signal(false);
  newComment = signal('');
  isSubmittingComment = signal(false);
  sliderIndex = signal(0);

  isAuthenticated = this.authService.isAuthenticated;
  currentUser = this.authService.currentUser;

  categories = POST_CATEGORIES;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.loadPost(slug);
      }
    });
  }

  private loadPost(slug: string): void {
    this.isLoading.set(true);
    this.contentExpanded.set(false);
    this.sliderIndex.set(0);

    this.forumBlogService.getPostById(slug).subscribe((post) => {
      this.post.set(post);
      this.isLoading.set(false);

      if (post) {
        this.forumBlogService.getRelatedPosts(post.id, 6).subscribe((related) => {
          this.relatedPosts.set(related);
        });
        this.loadMockComments(post.id);
      }
    });
  }

  private loadMockComments(postId: string): void {
    const mock: Comment[] = [
      {
        id: 'c1',
        postId,
        author: { id: 'u1', name: 'Kovács Anna', role: 'user', verified: false },
        content: 'Nagyon hasznos bejegyzés, köszönöm!',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
        likes: 4,
        isEdited: false,
      },
      {
        id: 'c2',
        postId,
        author: { id: 'u2', name: 'Dr. Nagy Péter', role: 'pharmacist', verified: true },
        content: 'Fontos kiegészítés: mindig konzultálj gyógyszerésszel, mielőtt bármilyen szert szednél.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1),
        likes: 11,
        isEdited: false,
      },
    ];
    this.comments.set(mock);
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

  submitComment(): void {
    const text = this.newComment().trim();
    if (!text || !this.isAuthenticated()) return;

    this.isSubmittingComment.set(true);
    const user = this.currentUser();

    const comment: Comment = {
      id: 'c' + Date.now(),
      postId: this.post()?.id || '',
      author: {
        id: user?.id || 'me',
        name: `${user?.firstname || ''} ${user?.lastname || ''}`.trim() || user?.email || 'Te',
        role: 'user',
        verified: false,
      },
      content: text,
      createdAt: new Date(),
      likes: 0,
      isEdited: false,
    };

    setTimeout(() => {
      this.comments.update((c) => [...c, comment]);
      this.newComment.set('');
      this.isSubmittingComment.set(false);
    }, 400);
  }

  // Slider
  get sliderVisible(): Post[] {
    return this.relatedPosts().slice(this.sliderIndex(), this.sliderIndex() + 3);
  }

  sliderPrev(): void {
    this.sliderIndex.update((i) => Math.max(0, i - 1));
  }

  sliderNext(): void {
    this.sliderIndex.update((i) =>
      Math.min(this.relatedPosts().length - 3, i + 1),
    );
  }

  get canSliderPrev(): boolean {
    return this.sliderIndex() > 0;
  }

  get canSliderNext(): boolean {
    return this.sliderIndex() + 3 < this.relatedPosts().length;
  }
}
