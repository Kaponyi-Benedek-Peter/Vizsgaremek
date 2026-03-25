import { describe, it, expect } from 'vitest';
import { smartFilter, emptyProductForm } from './admin.utils';
import { FieldExtractor } from '../models/admin.models';

interface TestItem {
  id: string;
  name: string;
  email: string;
  role: string;
}

const COLUMN_MAP: Record<string, FieldExtractor<TestItem>> = {
  id: (i) => i.id,
  name: (i) => i.name,
  email: (i) => i.email,
  role: (i) => i.role,
};

const ITEMS: TestItem[] = [
  { id: '1', name: 'Kovács Béla', email: 'bela@gmail.com', role: 'admin' },
  { id: '2', name: 'Nagy Anna', email: 'anna@outlook.com', role: 'verified' },
  { id: '3', name: 'Horváth Péter', email: 'peter@freemail.hu', role: 'verified' },
  { id: '4', name: 'Tóth Mária', email: 'maria@citromail.hu', role: 'banned' },
];

describe('smartFilter', () => {
  it('should return all items for empty query', () => {
    expect(smartFilter(ITEMS, '', COLUMN_MAP)).toEqual(ITEMS);
    expect(smartFilter(ITEMS, '   ', COLUMN_MAP)).toEqual(ITEMS);
  });

  it('should filter globally across all columns', () => {
    const result = smartFilter(ITEMS, 'anna', COLUMN_MAP);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Nagy Anna');
  });

  it('should be case-insensitive', () => {
    const result = smartFilter(ITEMS, 'ANNA', COLUMN_MAP);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Nagy Anna');
  });

  it('should filter by specific column with colon syntax', () => {
    const result = smartFilter(ITEMS, 'role:admin', COLUMN_MAP);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Kovács Béla');
  });

  it('should filter by email column', () => {
    const result = smartFilter(ITEMS, 'email:gmail', COLUMN_MAP);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('should return empty array when no value match in column', () => {
    const result = smartFilter(ITEMS, 'role:superadmin', COLUMN_MAP);
    expect(result).toHaveLength(0);
  });

  it('should return all items for unknown column name (no-op)', () => {
    const result = smartFilter(ITEMS, 'nonexistent:value', COLUMN_MAP);
    expect(result).toEqual(ITEMS);
  });

  it('should handle global search matching multiple items', () => {
    const result = smartFilter(ITEMS, 'verified', COLUMN_MAP);
    expect(result).toHaveLength(2);
  });

  it('should handle partial matches', () => {
    const result = smartFilter(ITEMS, 'kov', COLUMN_MAP);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Kovács Béla');
  });

  it('should handle .hu email domain filter', () => {
    const result = smartFilter(ITEMS, 'email:.hu', COLUMN_MAP);
    expect(result).toHaveLength(2);
  });

  it('should handle empty items array', () => {
    expect(smartFilter([], 'test', COLUMN_MAP)).toEqual([]);
  });

  it('should treat colon at start as literal global search', () => {
    const result = smartFilter(ITEMS, ':admin', COLUMN_MAP);
    expect(result).toHaveLength(0);
  });
});

describe('emptyProductForm', () => {
  it('should return an object with all fields empty/zero', () => {
    const form = emptyProductForm();

    expect(form.name_hu).toBe('');
    expect(form.name_en).toBe('');
    expect(form.name_de).toBe('');
    expect(form.price_huf).toBe(0);
    expect(form.sale_percentage).toBe(0);
    expect(form.stock).toBe(0);
    expect(form.featured).toBe(false);
    expect(form.category_id).toBe('');
    expect(form.sku).toBe('');
  });

  it('should return a new object each time (no shared reference)', () => {
    const a = emptyProductForm();
    const b = emptyProductForm();

    expect(a).toEqual(b);
    expect(a).not.toBe(b);

    a.name_hu = 'modified';
    expect(b.name_hu).toBe('');
  });
});
