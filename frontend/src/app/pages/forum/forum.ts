import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
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
  imports: [RouterModule, FormsModule, TranslateModule, PostCardComponent],
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
  private router = inject(Router);
  forumService = inject(ForumService);

  isAuthenticated = computed(() => this.authService.isAuthenticated());
  isAdmin = computed(() => this.authService.isAdmin());

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

  navigateToNewPost(): void {
    this.router.navigate(['/admin'], { queryParams: { section: 'posts', action: 'new' } });
  }

  applySearch(): void {
    const filters: PostFilters = {
      search_query: this.search_query() || undefined,
      category_id: this.selectedCategory() !== 'all' ? this.selectedCategory() : undefined,
    };
    this.forumService.setFilters(filters);
    this.forumService.setSorting(this.selectedSort());
  }

  clearSearch(): void {
    this.search_query.set('');
    this.forumService.setFilters({});
  }

  changeSort(value: SortOption): void {
    this.selectedSort.set(value);
    this.forumService.setSorting(value);
  }

  selectCategory(categoryId: PostCategory | 'all'): void {
    this.selectedCategory.set(categoryId);
    const filters: PostFilters = {
      search_query: this.search_query() || undefined,
      category_id: categoryId !== 'all' ? categoryId : undefined,
    };
    this.forumService.setFilters(filters);
  }

  resetFilters(): void {
    this.search_query.set('');
    this.selectedCategory.set('all');
    this.forumService.setFilters({});
  }

  nextPage(): void {
    this.forumService.setPage(this.forumService.current_page() + 1);
  }

  prevPage(): void {
    this.forumService.setPage(this.forumService.current_page() - 1);
  }

  goToPage(page: number): void {
    this.forumService.setPage(page);
  }

  getPageNumbers(): number[] {
    const total = this.total_pages();
    const current = this.forumService.current_page();
    const pages: number[] = [];
    const range = 2;

    for (let i = Math.max(1, current - range); i <= Math.min(total, current + range); i++) {
      pages.push(i);
    }
    return pages;
  }
}
