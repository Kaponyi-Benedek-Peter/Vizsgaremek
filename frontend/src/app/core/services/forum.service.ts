import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { catchError, map, timeout, forkJoin, of } from 'rxjs';

import {
  Post,
  BlogPost,
  PostFilters,
  SortOption,
  CategoryInfo,
  BackendCategory,
  BackendCategoryResponse,
  BackendPostsResponse,
  CATEGORY_COLOR_MAP,
  DEFAULT_CATEGORY_COLOR,
} from '../models/forum.model';
import { getCategoryIcon } from '../constants/visuals';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  private http = inject(HttpClient);
  private translate = inject(TranslateService);

  private readonly API_URL = environment.baseURL;
  private readonly REQUEST_TIMEOUT = 8000;

  // ── Private state ──────────────────────────────────────────────────────────

  private postsSignal = signal<Post[]>([]);
  private categoriesSignal = signal<CategoryInfo[]>([]);
  private filtersSignal = signal<PostFilters>({});
  private sortBySignal = signal<SortOption>('newest');
  private currentPageSignal = signal(1);
  private pageSizeSignal = signal(9);
  private isLoadingSignal = signal(false);
  private loadErrorSignal = signal(false);

  // ── Public readonly signals ────────────────────────────────────────────────

  posts = this.postsSignal.asReadonly();
  categories = this.categoriesSignal.asReadonly();
  filters = this.filtersSignal.asReadonly();
  sortBy = this.sortBySignal.asReadonly();
  isLoading = this.isLoadingSignal.asReadonly();
  loadError = this.loadErrorSignal.asReadonly();

  currentPage = computed(() => this.currentPageSignal());

  filteredPosts = computed(() => {
    const posts = this.applyFilters(this.postsSignal(), this.filtersSignal());
    return this.applySorting(posts, this.sortBySignal());
  });

  paginatedPosts = computed(() => {
    const posts = this.filteredPosts();
    const page = this.currentPageSignal();
    const pageSize = this.pageSizeSignal();
    const start = (page - 1) * pageSize;
    return posts.slice(start, start + pageSize);
  });

  totalPages = computed(() => Math.ceil(this.filteredPosts().length / this.pageSizeSignal()));

  // ── Backend loading ────────────────────────────────────────────────────────

  loadPosts(): void {
    this.isLoadingSignal.set(true);
    this.loadErrorSignal.set(false);

    forkJoin({
      categories: this.fetchCategories(),
      posts: this.fetchPosts(),
    }).subscribe({
      next: ({ categories, posts }) => {
        this.categoriesSignal.set(categories);
        this.postsSignal.set(posts);
        this.isLoadingSignal.set(false);
      },
      error: () => {
        this.loadErrorSignal.set(true);
        this.isLoadingSignal.set(false);
      },
    });
  }

  private fetchCategories() {
    return this.http.get<BackendCategoryResponse>(`${this.API_URL}/get_forum_categories`).pipe(
      timeout(this.REQUEST_TIMEOUT),
      map((res) => {
        if (res?.status === 'success' && Array.isArray(res.categories)) {
          return this.mapBackendCategories(res.categories);
        }
        return [] as CategoryInfo[];
      }),
      catchError(() => of([] as CategoryInfo[])),
    );
  }

  private fetchPosts() {
    return this.http
      .post<BackendPostsResponse>(`${this.API_URL}/get_forum_posts`, { type: 'forum' })
      .pipe(
        timeout(this.REQUEST_TIMEOUT),
        map((res) => {
          if (res?.status === 'success' && Array.isArray(res.posts)) {
            return res.posts;
          }
          return [] as Post[];
        }),
        catchError(() => {
          this.loadErrorSignal.set(true);
          return of([] as Post[]);
        }),
      );
  }

  private mapBackendCategories(backendCategories: BackendCategory[]): CategoryInfo[] {
    const lang = this.translate.currentLang || this.translate.defaultLang || 'en';
    return backendCategories.map(
      (bc): CategoryInfo => ({
        id: bc.id,
        iconSrc: getCategoryIcon(bc.id), // ← existing helper from visuals.ts
        colorClass: CATEGORY_COLOR_MAP[bc.id] ?? DEFAULT_CATEGORY_COLOR,
        displayName: this.resolveName(bc, lang),
      }),
    );
  }

  private resolveName(bc: BackendCategory, lang: string): string {
    if (lang === 'hu' && bc.name_hu) return bc.name_hu;
    if (lang === 'de' && bc.name_de) return bc.name_de;
    return bc.name_en || bc.name_hu || bc.id;
  }

  // ── Observable helpers (used by forum-detail) ─────────────────────────────

  getPostById(idOrSlug: string) {
    return this.http
      .post<{
        status: string;
        statuscode: number;
        post: Post;
      }>(`${this.API_URL}/get_forum_post`, { id: idOrSlug, slug: idOrSlug })
      .pipe(
        timeout(this.REQUEST_TIMEOUT),
        map((res) => (res?.status === 'success' ? res.post : null)),
        catchError(() => {
          const cached =
            this.postsSignal().find((p) => p.id === idOrSlug || p.slug === idOrSlug) ?? null;
          return of(cached);
        }),
      );
  }

  getRelatedPosts(postId: string, limit = 6) {
    const current = this.postsSignal().find((p) => p.id === postId);
    if (!current) return of([] as Post[]);
    const related = this.postsSignal()
      .filter((p) => p.id !== postId && p.category === current.category)
      .slice(0, limit);
    return of(related);
  }

  getFeaturedBlogPosts(limit = 3) {
    const featured = this.postsSignal()
      .filter((p): p is BlogPost => p.type === 'blog' && p.is_featured)
      .slice(0, limit);
    return of(featured);
  }

  // ── Filter / sort / pagination ─────────────────────────────────────────────

  setFilters(filters: PostFilters): void {
    this.filtersSignal.set(filters);
    this.currentPageSignal.set(1);
  }

  setSorting(sortBy: SortOption): void {
    this.sortBySignal.set(sortBy);
    this.currentPageSignal.set(1);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPageSignal.set(page);
    }
  }

  setPosts(posts: Post[]): void {
    this.postsSignal.set(posts);
    this.currentPageSignal.set(1);
  }

  private applyFilters(posts: Post[], filters: PostFilters): Post[] {
    return posts.filter((post) => {
      if (filters.category && post.category !== filters.category) return false;
      if (filters.type && post.type !== filters.type) return false;
      if (filters.author_role && post.author.role !== filters.author_role) return false;
      if (filters.is_featured !== undefined && post.is_featured !== filters.is_featured)
        return false;
      if (filters.is_pinned !== undefined && post.is_pinned !== filters.is_pinned) return false;
      if (filters.search_query) {
        const query = filters.search_query.toLowerCase();
        const searchable = `${post.title} ${post.excerpt} ${post.content}`.toLowerCase();
        if (!searchable.includes(query)) return false;
      }
      if (filters.tags && filters.tags.length > 0) {
        if (!filters.tags.some((tag) => post.tags.includes(tag))) return false;
      }
      return true;
    });
  }

  private applySorting(posts: Post[], sortBy: SortOption): Post[] {
    const sorted = [...posts];
    switch (sortBy) {
      case 'newest':
        return sorted.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
      case 'oldest':
        return sorted.sort(
          (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        );
      case 'most-viewed':
        return sorted.sort((a, b) => b.views - a.views);
      case 'most-liked':
        return sorted.sort((a, b) => b.likes - a.likes);
      case 'trending':
        return sorted.sort((a, b) => this.trendingScore(b) - this.trendingScore(a));
      default:
        return sorted;
    }
  }

  private trendingScore(post: Post): number {
    const publishedMs = post.published_at ? new Date(post.published_at).getTime() : 0;
    const daysSince = publishedMs ? (Date.now() - publishedMs) / (1000 * 60 * 60 * 24) : 999;
    const recency = Math.max(0, 7 - daysSince);
    const activity = post.views * 0.1 + post.likes * 2 + post.comment_count * 5;
    return recency * 10 + activity;
  }
}
