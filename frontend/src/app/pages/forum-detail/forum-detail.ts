import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ForumService } from '../../core/services/forum.service';
import { AuthService } from '../../core/services/auth.service';
import { Post, BlogPost, Comment, CategoryInfo } from '../../core/models/forum.model';
import { ICONS, IMAGES } from '../../core/constants/visuals';

@Component({
  selector: 'app-forum-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslateModule],
  templateUrl: './forum-detail.html',
  styleUrl: './forum-detail.css',
})
export class ForumDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private forumBlogService = inject(ForumService);
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

  readonly ICONS = ICONS;
  readonly IMAGES = IMAGES;

  isAuthenticated = this.authService.isAuthenticated;
  currentUser = this.authService.currentUser;

  private get sessionToken(): string {
    return this.authService.sessionToken() ?? '';
  }

  categories = computed(() => this.forumBlogService.categories());

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) this.loadPost(slug);
    });
  }

  private loadPost(slug: string): void {
    this.isLoading.set(true);
    this.contentExpanded.set(false);
    this.sliderIndex.set(0);
    this.comments.set([]);

    this.forumBlogService.getPostById(slug).subscribe((post) => {
      this.post.set(post);
      this.isLoading.set(false);

      if (post) {
        this.forumBlogService.getRelatedPosts(post.id, 6).subscribe((related) => {
          this.relatedPosts.set(related);
        });
      }
    });
  }

  getCategoryInfo(categoryId: string): CategoryInfo | undefined {
    return this.categories().find((c: CategoryInfo) => c.id === categoryId);
  }

  getReadingTime(): number {
    const p = this.post();
    return p?.type === 'blog' ? ((p as BlogPost).reading_time ?? 0) : 0;
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    return new Intl.DateTimeFormat(this.translate.currentLang || 'hu', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateStr));
  }

  toggleContent(): void {
    this.contentExpanded.update((v) => !v);
  }

  submitComment(): void {
    const text = this.newComment().trim();
    if (!text || !this.isAuthenticated()) return;

    this.isSubmittingComment.set(true);
    const user = this.currentUser();
    const post = this.post();
    if (!post) return;

    // TODO: this.forumBlogService.addComment(post.id, user!.id, this.sessionToken, text).subscribe(...)

    const comment: Comment = {
      id: 'c' + Date.now(),
      post_id: post.id,
      author: {
        id: user?.id || 'me',
        name: `${user?.firstname || ''} ${user?.lastname || ''}`.trim() || user?.email || 'Te',
        role: 'user',
        verified: false,
      },
      content: text,
      created_at: new Date().toISOString(),
      likes: 0,
      is_edited: false,
    };

    setTimeout(() => {
      this.comments.update((c) => [...c, comment]);
      this.newComment.set('');
      this.isSubmittingComment.set(false);
    }, 400);
  }

  get sliderVisible(): Post[] {
    return this.relatedPosts().slice(this.sliderIndex(), this.sliderIndex() + 3);
  }

  sliderPrev(): void {
    this.sliderIndex.update((i) => Math.max(0, i - 1));
  }

  sliderNext(): void {
    this.sliderIndex.update((i) => Math.min(this.relatedPosts().length - 3, i + 1));
  }

  get canSliderPrev(): boolean {
    return this.sliderIndex() > 0;
  }
  get canSliderNext(): boolean {
    return this.sliderIndex() + 3 < this.relatedPosts().length;
  }
}
