import { Component, OnInit, inject, signal, computed } from '@angular/core';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ForumService } from '../../core/services/forum.service';
import { AuthService } from '../../core/services/auth.service';
import { Post, Comment, CategoryInfo } from '../../core/models/forum.model';
import { ICONS, IMAGES } from '../../core/constants/visuals';

@Component({
  selector: 'app-forum-detail',
  standalone: true,
  imports: [RouterModule, FormsModule, TranslateModule],
  templateUrl: './forum-detail.html',
  styleUrl: './forum-detail.css',
})
export class ForumDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private forumService = inject(ForumService);
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

  private get sessionToken(): string {
    return this.authService.sessionToken() ?? '';
  }

  categories = computed(() => this.forumService.categories());

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) this.loadPost(id);
    });
  }

  private loadPost(id: string): void {
    this.isLoading.set(true);
    this.contentExpanded.set(false);
    this.sliderIndex.set(0);
    this.comments.set([]);
    const userId = this.authService.currentUser()?.id ?? '';
    const sessToken = this.sessionToken;
    const isAdmin = this.authService.isAdmin();

    this.forumService
      .getPostById(id, isAdmin, isAdmin ? userId : '', isAdmin ? sessToken : '')
      .subscribe((post) => {
        this.post.set(post);
        this.isLoading.set(false);

        if (post) {
          if (this.authService.isAuthenticated()) {
            this.forumService.incrementViews(post.id, userId, sessToken).subscribe();
          }

          this.forumService.getComments(post.id).subscribe((comments) => {
            this.comments.set(comments);
          });

          this.forumService.getRelatedPosts(post.id, 6).subscribe((related) => {
            this.relatedPosts.set(related);
          });
        }
      });
  }

  getCategoryInfo(categoryId: string): CategoryInfo | undefined {
    return this.categories().find((c: CategoryInfo) => c.id === categoryId);
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
    const post = this.post();
    if (!text || !this.isAuthenticated() || !post || !this.sessionToken) return;

    this.isSubmittingComment.set(true);

    // TODO: bekötni amikor Áron kész a backend oldallal
    // this.forumService.addComment(post.id, this.sessionToken, text).subscribe({
    //   next: (res) => {
    //     this.forumService.getComments(post.id).subscribe((comments) => {
    //       this.comments.set(comments);
    //     });
    //     this.newComment.set('');
    //     this.isSubmittingComment.set(false);
    //   },
    //   error: () => {
    //     this.isSubmittingComment.set(false);
    //   },
    // });

    setTimeout(() => {
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
