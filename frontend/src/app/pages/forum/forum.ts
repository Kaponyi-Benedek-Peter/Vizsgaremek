import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ForumService } from '../../core/services/forum.service';
import { AuthService } from '../../core/services/auth.service';
import { PostCardComponent } from '../../shared/components/post-card/post-card';
import { Post, PostFilters, SortOption, PostCategory } from '../../core/models/forum.model';
import { ICONS, IMAGES } from '../../core/constants/visuals';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslateModule, PostCardComponent],
  templateUrl: './forum.html',
  styleUrl: './forum.css',
})
export class Forum implements OnInit {
  search_query = signal('');
  selectedCategory = signal<PostCategory | 'all'>('all');
  selectedSort = signal<SortOption>('newest');

  readonly ICONS = ICONS;
  readonly IMAGES = IMAGES;

  private translate = inject(TranslateService);
  private authService = inject(AuthService);

  isAuthenticated = computed(() => this.authService.isAuthenticated());

  constructor(public forumService: ForumService) {}

  posts = computed(() => this.forumService.paginatedPosts());
  total_pages = computed(() => this.forumService.total_pages());
  categories = computed(() => this.forumService.categories());

  sortOptions: { value: SortOption; translateKey: string }[] = [
    { value: 'newest', translateKey: 'forum.sort.newest' },
    { value: 'oldest', translateKey: 'forum.sort.oldest' },
    { value: 'most-viewed', translateKey: 'forum.sort.most_viewed' },
    { value: 'most-liked', translateKey: 'forum.sort.most_liked' },
    { value: 'trending', translateKey: 'forum.sort.trending' },
  ];

  ngOnInit(): void {
    this.forumService.loadPosts();
  }

  applySearch(): void {
    const filters: PostFilters = {
      search_query: this.search_query() || undefined,
      // category_id alapján szűr (nem category — az nem létezik a Post modellben)
      category_id:
        this.selectedCategory() !== 'all' ? (this.selectedCategory() as PostCategory) : undefined,
    };
    this.forumService.setFilters(filters);
  }

  selectCategory(category: PostCategory | 'all'): void {
    this.selectedCategory.set(category);
    this.applySearch();
  }

  changeSort(sort_by: SortOption): void {
    this.selectedSort.set(sort_by);
    this.forumService.setSorting(sort_by);
  }

  clearSearch(): void {
    this.search_query.set('');
    this.applySearch();
  }

  resetFilters(): void {
    this.search_query.set('');
    this.selectedCategory.set('all');
    this.forumService.setFilters({});
  }

  goToPage(page: number): void {
    this.forumService.setPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  previousPage(): void {
    const current = this.forumService.current_page();
    if (current > 1) this.goToPage(current - 1);
  }

  nextPage(): void {
    const current = this.forumService.current_page();
    if (current < this.total_pages()) this.goToPage(current + 1);
  }

  getPageNumbers(): number[] {
    const current = this.forumService.current_page();
    const total = this.total_pages();
    const pages: number[] = [];

    pages.push(1);
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    if (start > 2) pages.push(-1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < total - 1) pages.push(-1);
    if (total > 1) pages.push(total);

    return pages;
  }

  getPageAriaLabel(pageNum: number): string {
    return `${this.translate.instant('pagination.page')} ${pageNum}`;
  }

  onPostClick(post: Post): void {
    void post;
  }
}
