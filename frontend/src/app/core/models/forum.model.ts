// ============================================================
// forum-blog.model.ts — snake_case, matches backend API 1:1
// ============================================================

export type PostCategory =
  | 'medicines'
  | 'natural-remedies'
  | 'baby-mother'
  | 'healthy-lifestyle'
  | 'seasonal-health'
  | 'qa'
  | 'general';

export type PostStatus = 'draft' | 'published' | 'archived' | 'pending';

export type PostType = 'blog' | 'forum';

export type AuthorRole = 'admin' | 'pharmacist' | 'user';

export interface Author {
  id: string;
  name: string;
  role: AuthorRole;
  avatar?: string;
  verified: boolean;
}

export interface Comment {
  id: string;
  post_id: string;
  author: Author;
  content: string;
  created_at: string; // ISO 8601 string from backend
  updated_at?: string;
  likes: number;
  is_edited: boolean;
}

export interface BasePost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: Author;
  category: PostCategory;
  tags: string[];
  image_url?: string;
  status: PostStatus;
  created_at: string; // ISO 8601 string from backend
  updated_at?: string;
  published_at?: string;
  views: number;
  likes: number;
  comment_count: number;
  is_featured: boolean;
  is_pinned: boolean;
}

export interface BlogPost extends BasePost {
  type: 'blog';
  reading_time: number;
  related_products?: string[];
  seo_description?: string;
  seo_keywords?: string[];
}

export interface ForumPost extends BasePost {
  type: 'forum';
  is_question: boolean;
  has_accepted_answer: boolean;
  accepted_answer_id?: string;
  last_activity_at: string;
}

export type Post = BlogPost | ForumPost;

// ---- Filter / Pagination ----

export interface PostFilters {
  category?: PostCategory;
  tags?: string[];
  author_role?: AuthorRole;
  search_query?: string;
  status?: PostStatus;
  type?: PostType;
  is_featured?: boolean;
  is_pinned?: boolean;
}

export type SortOption = 'newest' | 'oldest' | 'most-viewed' | 'most-liked' | 'trending';

export interface PaginationOptions {
  page: number;
  page_size: number;
  total_items?: number;
  total_pages?: number;
}

export interface PostListResponse {
  posts: Post[];
  pagination: PaginationOptions;
  filters: PostFilters;
  sort_by: SortOption;
}

// ---- Category metadata (frontend-only, not from API) ----

export interface CategoryInfo {
  id: PostCategory;
  icon: string;
  colorClass: string;
  translationKey: string;
}

export const POST_CATEGORIES: CategoryInfo[] = [
  {
    id: 'medicines',
    icon: '💊',
    colorClass: 'category-medicines',
    translationKey: 'forum.category.medicines',
  },
  {
    id: 'natural-remedies',
    icon: '🌿',
    colorClass: 'category-natural',
    translationKey: 'forum.category.natural_remedies',
  },
  {
    id: 'baby-mother',
    icon: '👶',
    colorClass: 'category-baby',
    translationKey: 'forum.category.baby_mother',
  },
  {
    id: 'healthy-lifestyle',
    icon: '🏃',
    colorClass: 'category-lifestyle',
    translationKey: 'forum.category.healthy_lifestyle',
  },
  {
    id: 'seasonal-health',
    icon: '🌸',
    colorClass: 'category-seasonal',
    translationKey: 'forum.category.seasonal_health',
  },
  {
    id: 'qa',
    icon: '❓',
    colorClass: 'category-qa',
    translationKey: 'forum.category.qa',
  },
  {
    id: 'general',
    icon: '💬',
    colorClass: 'category-general',
    translationKey: 'forum.category.general',
  },
];
