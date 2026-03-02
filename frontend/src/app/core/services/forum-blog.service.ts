import { Injectable, signal, computed } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import {
  Post,
  BlogPost,
  ForumPost,
  PostFilters,
  SortOption,
  Author,
} from '../models/forum-blog.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ForumBlogService {
  private postsSignal = signal<Post[]>([]);
  private filtersSignal = signal<PostFilters>({});
  private sortBySignal = signal<SortOption>('newest');
  private currentPageSignal = signal(1);
  private pageSizeSignal = signal(9);

  posts = this.postsSignal.asReadonly();
  filters = this.filtersSignal.asReadonly();
  sortBy = this.sortBySignal.asReadonly();

  currentPage = computed(() => this.currentPageSignal());

  filteredPosts = computed(() => {
    const posts = this.applyFilters(this.postsSignal(), this.filtersSignal());
    return this.applySorting(posts, this.sortBySignal());
  });

  paginatedPosts = computed(() => {
    const posts = this.filteredPosts();
    const page = this.currentPageSignal();
    const pageSize = this.pageSizeSignal();
    const startIndex = (page - 1) * pageSize;
    return posts.slice(startIndex, startIndex + pageSize);
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredPosts().length / this.pageSizeSignal());
  });

  getAllPosts(): Observable<Post[]> {
    return of(this.postsSignal()).pipe(delay(300));
  }

  getBlogPosts(): Observable<BlogPost[]> {
    const blogPosts = this.postsSignal().filter((post): post is BlogPost => post.type === 'blog');
    return of(blogPosts).pipe(delay(300));
  }

  getForumPosts(): Observable<ForumPost[]> {
    const forumPosts = this.postsSignal().filter(
      (post): post is ForumPost => post.type === 'forum',
    );
    return of(forumPosts).pipe(delay(300));
  }

  getPostById(idOrSlug: string): Observable<Post | null> {
    const post = this.postsSignal().find((p) => p.id === idOrSlug || p.slug === idOrSlug) || null;
    return of(post).pipe(delay(200));
  }

  getFeaturedBlogPosts(limit = 3): Observable<BlogPost[]> {
    const featured = this.postsSignal()
      .filter((post): post is BlogPost => post.type === 'blog' && post.isFeatured)
      .slice(0, limit);
    return of(featured).pipe(delay(200));
  }

  getRelatedPosts(postId: string, limit = 3): Observable<Post[]> {
    const currentPost = this.postsSignal().find((p) => p.id === postId);
    if (!currentPost) return of([]);
    const related = this.postsSignal()
      .filter((p) => p.id !== postId && p.category === currentPost.category)
      .slice(0, limit);
    return of(related).pipe(delay(200));
  }

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
      if (filters.authorRole && post.author.role !== filters.authorRole) return false;
      if (filters.isFeatured !== undefined && post.isFeatured !== filters.isFeatured) return false;
      if (filters.isPinned !== undefined && post.isPinned !== filters.isPinned) return false;
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const searchable = `${post.title} ${post.excerpt} ${post.content}`.toLowerCase();
        if (!searchable.includes(query)) return false;
      }
      if (filters.tags && filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some((tag) => post.tags.includes(tag));
        if (!hasMatchingTag) return false;
      }
      return true;
    });
  }

  private applySorting(posts: Post[], sortBy: SortOption): Post[] {
    const sorted = [...posts];
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      case 'oldest':
        return sorted.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      case 'most-viewed':
        return sorted.sort((a, b) => b.views - a.views);
      case 'most-liked':
        return sorted.sort((a, b) => b.likes - a.likes);
      case 'trending':
        return sorted.sort(
          (a, b) => this.calculateTrendingScore(b) - this.calculateTrendingScore(a),
        );
      default:
        return sorted;
    }
  }

  private calculateTrendingScore(post: Post): number {
    const daysSincePublished = post.publishedAt
      ? (Date.now() - post.publishedAt.getTime()) / (1000 * 60 * 60 * 24)
      : 999;
    const recencyScore = Math.max(0, 7 - daysSincePublished);
    const activityScore = post.views * 0.1 + post.likes * 2 + post.commentCount * 5;
    return recencyScore * 10 + activityScore;
  }
}
