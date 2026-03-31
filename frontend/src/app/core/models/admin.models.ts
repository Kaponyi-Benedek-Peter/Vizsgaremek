import { AdminUser, AdminOrder } from '../../core/services/account.service';
import { ProductWithHelpers } from '../../core/models/product.model';
import { Post } from '../../core/models/forum.model';

export type AdminSection = 'dashboard' | 'orders' | 'users' | 'products' | 'posts';

export interface NavItem {
  id: AdminSection;
  icon: string;
  label: string;
}

export interface ImageMeta {
  name: string;
  size: string;
  type: string;
  width: number;
  height: number;
  resolution: string;
  lastModified: string;
}

export interface GalleryImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text_hu: string;
  alt_text_en: string;
  alt_text_de: string;
  sort_id: string;
  file?: File;
  objectUrl?: string;
  meta?: ImageMeta;
}

export type ProductFormTab = 'basic' | 'pricing' | 'descriptions' | 'details';

export interface ProductFormData {
  name_hu: string;
  name_en: string;
  name_de: string;
  description_hu: string;
  description_en: string;
  description_de: string;
  description_preview_hu: string;
  description_preview_en: string;
  description_preview_de: string;
  price_huf: number;
  sale_percentage: number;
  stock: number;
  category_id: string;
  manufacturer: string;
  brand: string;
  sku: string;
  active_ingredients: string;
  packaging_hu: string;
  packaging_en: string;
  packaging_de: string;
  thumbnail_url: string;
  featured: boolean;
}

export type PostFormTab = 'basic' | 'content' | 'images';

export type PostStatus = 'draft' | 'published' | 'archived' | 'hidden';

export interface PostFormData {
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  category_id: string;
  tags: string;
  status: PostStatus;
  is_featured: boolean;
  slug: string;
}

export type UserActionType = 'change_role' | 'ban' | 'unban' | 'delete';

export interface UserActionRequest {
  user: AdminUser;
  action: UserActionType;
  newState?: string;
}

export type FieldExtractor<T> = (item: T) => string;

export const ACCOUNT_STATES = ['verified', 'unverified', 'admin', 'superadmin'] as const;

export const ADMIN_ASSIGNABLE_STATES = ['verified', 'unverified'] as const;

export const SUPERADMIN_ASSIGNABLE_STATES = ['verified', 'unverified', 'admin'] as const;

export const ORDER_COLUMNS: Record<string, FieldExtractor<AdminOrder>> = {
  id: (o) => o.id,
  email: (o) => o.email || '',
  billing: (o) => o.billing_name || '',
  city: (o) => o.city || '',
  zip: (o) => o.zipcode || '',
  address: (o) => o.address || '',
  phone: (o) => o.phone_number || '',
  price: (o) => o.price || '',
  status: (o) => o.order_status || '',
  note: (o) => o.note || '',
};

export const USER_COLUMNS: Record<string, FieldExtractor<AdminUser>> = {
  id: (u) => u.id,
  email: (u) => u.email || '',
  name: (u) => `${u.last_name} ${u.first_name}`.trim(),
  firstname: (u) => u.first_name || '',
  lastname: (u) => u.last_name || '',
  role: (u) => u.account_state || '',
  state: (u) => u.account_state || '',
};

export const PRODUCT_COLUMNS: Record<string, FieldExtractor<ProductWithHelpers>> = {
  id: (p) => p.id || '',
  name: (p) => p.name || '',
  brand: (p) => p.brand || '',
  category: (p) => p.category || '',
  sku: (p) => p.sku || '',
  price: (p) => String(p.price ?? ''),
  stock: (p) => String(p.stock_number ?? ''),
  rating: (p) => String(p.rating_number ?? ''),
  status: (p) => (p.in_stock ? 'active' : 'inactive'),
};

export const POST_COLUMNS: Record<string, FieldExtractor<Post>> = {
  id: (p) => p.id,
  title: (p) => p.title || '',
  excerpt: (p) => p.excerpt || '',
  tags: (p) => p.tags || '',
  status: (p) => p.status || '',
  category: (p) => p.category_id || '',
};
