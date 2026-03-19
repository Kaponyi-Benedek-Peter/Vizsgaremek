import { Injectable } from '@angular/core';
import { ICONS, IMAGES } from '../constants/visuals';

const CACHE_NAME = 'roy-shack-images-v1';

@Injectable({ providedIn: 'root' })
export class ImageCacheService {
  private supported = typeof caches !== 'undefined';
  private preloaded = false;
  private preloadPromise: Promise<void> | null = null;

  async preloadCriticalImages(): Promise<void> {
    if (!this.supported || this.preloaded) return;
    if (this.preloadPromise) return this.preloadPromise;

    this.preloadPromise = this.doPreload();
    return this.preloadPromise;
  }

  private async doPreload(): Promise<void> {
    try {
      const cache = await caches.open(CACHE_NAME);
      const existingKeys = await cache.keys();
      const existingUrls = new Set(existingKeys.map((r) => r.url));

      const urls = this.collectPreloadUrls();
      const toCache = urls.filter((url) => {
        const absolute = new URL(url, window.location.origin).href;
        return !existingUrls.has(absolute);
      });

      if (toCache.length === 0) {
        this.preloaded = true;
        return;
      }

      const batches = this.chunk(toCache, 6);
      for (const batch of batches) {
        const results = await Promise.allSettled(
          batch.map(async (url) => {
            const res = await fetch(url, { mode: 'cors', credentials: 'same-origin' });
            if (res.ok) {
              await cache.put(url, res);
            }
          }),
        );
        results.forEach((r, i) => {
          if (r.status === 'rejected') {
            console.warn(`ImageCache: failed to cache ${batch[i]}`);
          }
        });
      }

      this.preloaded = true;
    } catch (err) {
      console.warn('ImageCache: preload failed', err);
      this.preloaded = true;
    }
  }

  async getCachedUrl(src: string): Promise<string> {
    if (!this.supported || !src) return src;

    try {
      const cache = await caches.open(CACHE_NAME);
      const match = await cache.match(src);
      if (match) {
        const blob = await match.blob();
        return URL.createObjectURL(blob);
      }

      const response = await fetch(src, { mode: 'cors', credentials: 'same-origin' });
      if (response.ok) {
        const cloned = response.clone();
        cache.put(src, cloned).catch(() => {});
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      }
    } catch {}

    return src;
  }

  async cacheUrl(src: string): Promise<void> {
    if (!this.supported || !src) return;

    try {
      const cache = await caches.open(CACHE_NAME);
      const match = await cache.match(src);
      if (match) return;

      const response = await fetch(src, { mode: 'cors', credentials: 'same-origin' });
      if (response.ok) {
        await cache.put(src, response);
      }
    } catch {}
  }

  async clearCache(): Promise<void> {
    if (!this.supported) return;
    await caches.delete(CACHE_NAME);
    this.preloaded = false;
    this.preloadPromise = null;
  }

  private collectPreloadUrls(): string[] {
    const urls: string[] = [];

    Object.values(ICONS).forEach((url) => {
      if (typeof url === 'string' && url && !url.startsWith('data:')) {
        urls.push(url);
      }
    });

    Object.entries(IMAGES).forEach(([, url]) => {
      if (
        typeof url === 'string' &&
        url &&
        !url.startsWith('data:') &&
        !url.includes('placeholder')
      ) {
        urls.push(url);
      }
    });

    return [...new Set(urls)];
  }

  private chunk<T>(arr: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }
}
