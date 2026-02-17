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

@Injectable({
  providedIn: 'root',
})
export class ForumBlogService {
  private postsSignal = signal<Post[]>(this.getMockPosts());
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

  private getMockPosts(): Post[] {
    const mockAuthors: Author[] = [
      { id: '1', name: 'Dr. Nagy Katalin', role: 'pharmacist', verified: true },
      { id: '2', name: 'Roy patika', role: 'admin', verified: true },
      { id: '3', name: 'Kovács Anna', role: 'user', verified: false },
      { id: '4', name: 'Dr. Szabó Péter', role: 'pharmacist', verified: true },
    ];

    const blogPosts: BlogPost[] = [
      {
        id: 'blog-1',
        type: 'blog',
        title: 'Téli influenza megelőzés: amit tudnod kell',
        slug: 'teli-influenza-megelozes',
        excerpt:
          'A téli hónapok beköszöntével különösen fontos az influenza elleni védelem. Ebben a cikkben megmutatjuk, hogyan erősítheted immunrendszeredet.',
        content: 'A téli influenza minden évben milliók életét nehezíti meg világszerte.',
        author: mockAuthors[0],
        category: 'seasonal-health',
        tags: ['influenza', 'megelőzés', 'tél', 'vitamin'],
        imageUrl: '/assets/images/blog/influenza-prevention.jpg',
        status: 'published',
        createdAt: new Date('2024-11-15'),
        publishedAt: new Date('2024-11-15'),
        views: 1234,
        likes: 89,
        commentCount: 12,
        isFeatured: true,
        isPinned: true,
        readingTime: 5,
      },
      {
        id: 'blog-2',
        type: 'blog',
        title: 'Allergiás tünetek enyhítése természetes módon',
        slug: 'allergias-tunetek-termeszetes-enyhites',
        excerpt:
          'A tavaszi allergiaszezon kihívást jelenthet sokak számára. Ismerd meg a természetes módszereket!',
        content: 'Az allergia egy túlérzékenységi reakció.',
        author: mockAuthors[1],
        category: 'natural-remedies',
        tags: ['allergia', 'természetes gyógymód', 'tavasz'],
        imageUrl: '/assets/images/blog/allergy-natural-remedies.jpg',
        status: 'published',
        createdAt: new Date('2024-03-10'),
        publishedAt: new Date('2024-03-10'),
        views: 856,
        likes: 67,
        commentCount: 8,
        isFeatured: true,
        isPinned: false,
        readingTime: 4,
      },
      {
        id: 'blog-3',
        type: 'blog',
        title: 'Baba bőrápolás: alapvető tudnivalók',
        slug: 'baba-borapolas-alapok',
        excerpt:
          'Az újszülött bőrápolása különleges figyelmet igényel. Tippek a legkisebbek bőrének védelmére.',
        content: 'A babák bőre rendkívül érzékeny és vékony.',
        author: mockAuthors[0],
        category: 'baby-mother',
        tags: ['baba', 'bőrápolás', 'újszülött'],
        imageUrl: '/assets/images/blog/baby-skincare.jpg',
        status: 'published',
        createdAt: new Date('2024-12-01'),
        publishedAt: new Date('2024-12-01'),
        views: 643,
        likes: 54,
        commentCount: 15,
        isFeatured: false,
        isPinned: false,
        readingTime: 6,
      },
    ];

    const forumPosts: ForumPost[] = [
      {
        id: 'forum-1',
        type: 'forum',
        title: 'Melyik fájdalomcsillapítót válasszam?',
        slug: 'melyik-fajdalomcsillapito',
        excerpt:
          'Gyakran fejfájós vagyok, de nem tudom, hogy paracetamol vagy ibuprofen lenne-e jobb nekem.',
        content: 'Sziasztok! Rendszeresen küzdök fejfájással...',
        author: mockAuthors[2],
        category: 'qa',
        tags: ['fájdalomcsillapító', 'paracetamol', 'ibuprofen'],
        status: 'published',
        createdAt: new Date('2024-12-10'),
        publishedAt: new Date('2024-12-10'),
        views: 342,
        likes: 23,
        commentCount: 7,
        isFeatured: false,
        isPinned: false,
        isQuestion: true,
        hasAcceptedAnswer: true,
        acceptedAnswerId: 'comment-1',
        lastActivityAt: new Date('2024-12-12'),
      },
      {
        id: 'forum-2',
        type: 'forum',
        title: 'D-vitamin pótlás télen - ki mennyit szed?',
        slug: 'd-vitamin-potlas-telen',
        excerpt: 'A téli hónapokban sokan küzdenek D-vitamin hiánnyal. Ki milyen adagot szed?',
        content: 'Sziasztok! Télen mindig fáradtabb vagyok...',
        author: mockAuthors[2],
        category: 'healthy-lifestyle',
        tags: ['D-vitamin', 'tél', 'vitamin pótlás'],
        status: 'published',
        createdAt: new Date('2024-11-20'),
        publishedAt: new Date('2024-11-20'),
        views: 567,
        likes: 45,
        commentCount: 18,
        isFeatured: false,
        isPinned: false,
        isQuestion: true,
        hasAcceptedAnswer: false,
        lastActivityAt: new Date('2024-12-11'),
      },
      {
        id: 'forum-3',
        type: 'forum',
        title: 'Probiotikumok antibiotikum kúra után',
        slug: 'probiotikumok-antibiotikum-utan',
        excerpt:
          'Antibiotikum kúrát követően érdemes probiotikumot szedni? Mikor kezdjem és meddig?',
        content: 'Nemrég fejeztem be egy 10 napos antibiotikum kúrát...',
        author: mockAuthors[2],
        category: 'medicines',
        tags: ['probiotikum', 'antibiotikum', 'bélflóra'],
        status: 'published',
        createdAt: new Date('2024-12-05'),
        publishedAt: new Date('2024-12-05'),
        views: 421,
        likes: 31,
        commentCount: 9,
        isFeatured: false,
        isPinned: false,
        isQuestion: true,
        hasAcceptedAnswer: true,
        acceptedAnswerId: 'comment-2',
        lastActivityAt: new Date('2024-12-09'),
      },
    ];

    return [...blogPosts, ...forumPosts];
  }
}
