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
  postId: string;
  author: Author;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  likes: number;
  isEdited: boolean;
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
  imageUrl?: string;
  status: PostStatus;
  createdAt: Date;
  updatedAt?: Date;
  publishedAt?: Date;
  views: number;
  likes: number;
  commentCount: number;
  isFeatured: boolean;
  isPinned: boolean;
}

export interface BlogPost extends BasePost {
  type: 'blog';
  readingTime: number;
  relatedProducts?: string[];
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface ForumPost extends BasePost {
  type: 'forum';
  isQuestion: boolean;
  hasAcceptedAnswer: boolean;
  acceptedAnswerId?: string;
  lastActivityAt: Date;
}

export type Post = BlogPost | ForumPost;

export interface PostFilters {
  category?: PostCategory;
  tags?: string[];
  authorRole?: AuthorRole;
  searchQuery?: string;
  status?: PostStatus;
  type?: PostType;
  isFeatured?: boolean;
  isPinned?: boolean;
}

export type SortOption = 'newest' | 'oldest' | 'most-viewed' | 'most-liked' | 'trending';

export interface PaginationOptions {
  page: number;
  pageSize: number;
  totalItems?: number;
  totalPages?: number;
}

export interface PostListResponse {
  posts: Post[];
  pagination: PaginationOptions;
  filters: PostFilters;
  sortBy: SortOption;
}

export interface CategoryInfo {
  id: PostCategory;
  icon: string;
  colorClass: string;
  translationKey: string;
}

//Mock
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
    icon: '💪',
    colorClass: 'category-lifestyle',
    translationKey: 'forum.category.healthy_lifestyle',
  },
  {
    id: 'seasonal-health',
    icon: '🤧',
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
    icon: '📝',
    colorClass: 'category-general',
    translationKey: 'forum.category.general',
  },
];
