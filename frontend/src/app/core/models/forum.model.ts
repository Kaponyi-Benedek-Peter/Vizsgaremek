export type PostCategory = string;

export type PostStatus = 'draft' | 'published' | 'archived' | 'hidden';

export type SortOption = 'newest' | 'oldest' | 'most-viewed' | 'most-liked' | 'trending';

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  likes: number;
  is_edited: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  user_id: string;
  category_id: string;
  tags: string;
  image_url?: string;
  status: PostStatus;
  views: number;
  likes: number;
  comment_count: number;
  is_featured: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
  last_activity_at?: string;
}

export interface PostFilters {
  category_id?: string;
  tags?: string[];
  search_query?: string;
  status?: PostStatus;
  is_featured?: number;
}

export interface PaginationOptions {
  page: number;
  page_size: number;
  total_items?: number;
  total_pages?: number;
}

export interface BackendCategory {
  id: string;
  name_hu: string;
  name_en: string;
  name_de: string;
  color: string;
  emoji: string;
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

export interface CategoryInfo {
  id: PostCategory;
  icon_src: string;
  color_class: string;
  display_name: string;
}

export const CATEGORY_COLOR_MAP: Record<string, string> = {
  medicine: 'category-medicines',
  'natural-remedies': 'category-natural',
  'baby-mother': 'category-baby',
  'healthy-lifestyle': 'category-lifestyle',
  'seasonal-health': 'category-seasonal',
  qa: 'category-qa',
  general: 'category-general',
};

export const DEFAULT_CATEGORY_COLOR = 'category-default';
