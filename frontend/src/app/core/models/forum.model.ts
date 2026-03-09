export type PostCategory = string;

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
  created_at: string;
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
  type: PostType;
  views: number;
  likes: number;
  comment_count: number;
  is_featured: boolean;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface BlogPost extends BasePost {
  type: 'blog';
  reading_time?: number;
  related_products?: string[];
  seo_title?: string;
  seo_description?: string;
}

export interface ForumPost extends BasePost {
  type: 'forum';
  is_question: boolean;
  has_accepted_answer: boolean;
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

// ---- Backend API response shapes ----

export interface BackendCategory {
  id: string;
  name_hu: string;
  name_en: string;
  name_de: string;
}

export interface BackendCategoryResponse {
  status: string;
  statuscode: number;
  categories: BackendCategory[];
}

export interface BackendPostsResponse {
  status: string;
  statuscode: number;
  posts: Post[];
}

// ---- CategoryInfo ----

export interface CategoryInfo {
  id: PostCategory;
  /** Image path from ICONS.category* in visuals.ts */
  iconSrc: string;
  colorClass: string;
  displayName: string;
}

export const CATEGORY_COLOR_MAP: Record<string, string> = {
  medicines: 'category-medicines',
  'natural-remedies': 'category-natural',
  'baby-mother': 'category-baby',
  'healthy-lifestyle': 'category-lifestyle',
  'seasonal-health': 'category-seasonal',
  qa: 'category-qa',
  general: 'category-general',
};

export const DEFAULT_CATEGORY_COLOR = 'category-default';
