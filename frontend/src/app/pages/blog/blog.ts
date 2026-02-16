import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ForumBlogService } from '../../core/services/forum-blog.service';
import { PostCardComponent } from '../../shared/components/post-card/post-card';
import {
  Post,
  BlogPost,
  PostFilters,
  SortOption,
  PostCategory,
  POST_CATEGORIES,
} from '../../core/models/forum-blog.model';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslateModule, PostCardComponent],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog implements OnInit {
  isLoading = signal(false);
  searchQuery = signal('');
  selectedCategory = signal<PostCategory | 'all'>('all');
  selectedSort = signal<SortOption>('newest');
  featuredPosts = signal<BlogPost[]>([]);

  private translate = inject(TranslateService);

  constructor(public blogService: ForumBlogService) {}

  posts = computed(() => this.blogService.paginatedPosts());
  currentPage = computed(() => this.blogService.currentPage);
  totalPages = computed(() => this.blogService.totalPages());

  categories = POST_CATEGORIES;

  sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Legújabb' },
    { value: 'oldest', label: 'Legrégebbi' },
    { value: 'most-viewed', label: 'Legtöbbet nézett' },
    { value: 'most-liked', label: 'Legnépszerűbb' },
    { value: 'trending', label: 'Felkapott' },
  ];

  ngOnInit(): void {
    this.loadBlogPosts();
    this.loadFeaturedPosts();
  }

  private loadBlogPosts(): void {
    this.isLoading.set(true);

    this.blogService.setFilters({ type: 'blog' });

    setTimeout(() => {
      this.isLoading.set(false);
    }, 300);
  }

  private loadFeaturedPosts(): void {
    this.blogService.getFeaturedBlogPosts(3).subscribe((posts) => {
      this.featuredPosts.set(posts);
    });
  }

  applySearch(): void {
    const filters: PostFilters = {
      type: 'blog',
      searchQuery: this.searchQuery() || undefined,
      category:
        this.selectedCategory() !== 'all' ? (this.selectedCategory() as PostCategory) : undefined,
    };

    this.blogService.setFilters(filters);
  }

  selectCategory(category: PostCategory | 'all'): void {
    this.selectedCategory.set(category);
    this.applySearch();
  }

  changeSort(sortBy: SortOption): void {
    this.selectedSort.set(sortBy);
    this.blogService.setSorting(sortBy);
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.applySearch();
  }

  goToPage(page: number): void {
    this.blogService.setPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  previousPage(): void {
    const currentPage = this.blogService.currentPage();
    if (currentPage > 1) {
      this.goToPage(currentPage - 1);
    }
  }

  nextPage(): void {
    const currentPage = this.blogService.currentPage();
    const totalPages = this.totalPages();
    if (currentPage < totalPages) {
      this.goToPage(currentPage + 1);
    }
  }

  getPageNumbers(): number[] {
    const current = this.blogService.currentPage();
    const total = this.totalPages();
    const pages: number[] = [];

    pages.push(1);

    let start = Math.max(2, current - 1);
    let end = Math.min(total - 1, current + 1);

    if (start > 2) {
      pages.push(-1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < total - 1) {
      pages.push(-1);
    }

    if (total > 1) {
      pages.push(total);
    }

    return pages;
  }

  getPageAriaLabel(pageNum: number): string {
    return `${this.translate.instant('pagination.page')} ${pageNum}`;
  }

  onPostClick(post: Post): void {
    console.log('Blog post clicked:', post.title);
  }
}
