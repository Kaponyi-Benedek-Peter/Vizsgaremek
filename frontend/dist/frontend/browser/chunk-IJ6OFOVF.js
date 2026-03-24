import {
  getCategoryIcon
} from "./chunk-B4AVD7OH.js";
import {
  HttpClient,
  environment
} from "./chunk-YSEAUUG4.js";
import {
  Injectable,
  TranslateService,
  catchError,
  computed,
  forkJoin,
  inject,
  map,
  of,
  setClassMetadata,
  signal,
  timeout,
  ɵɵdefineInjectable
} from "./chunk-WLHV2EEC.js";

// src/app/core/models/forum.model.ts
var CATEGORY_COLOR_MAP = {
  medicine: "category-medicines",
  "natural-remedies": "category-natural",
  "baby-mother": "category-baby",
  "healthy-lifestyle": "category-lifestyle",
  "seasonal-health": "category-seasonal",
  qa: "category-qa",
  general: "category-general"
};
var DEFAULT_CATEGORY_COLOR = "category-default";

// src/app/core/services/forum.service.ts
var ForumService = class _ForumService {
  http = inject(HttpClient);
  translate = inject(TranslateService);
  API_URL = environment.baseURL;
  REQUEST_TIMEOUT = 8e3;
  postsSignal = signal([], ...ngDevMode ? [{ debugName: "postsSignal" }] : []);
  categoriesSignal = signal([], ...ngDevMode ? [{ debugName: "categoriesSignal" }] : []);
  filtersSignal = signal({}, ...ngDevMode ? [{ debugName: "filtersSignal" }] : []);
  sortBySignal = signal("newest", ...ngDevMode ? [{ debugName: "sortBySignal" }] : []);
  current_pageSignal = signal(1, ...ngDevMode ? [{ debugName: "current_pageSignal" }] : []);
  pageSizeSignal = signal(9, ...ngDevMode ? [{ debugName: "pageSizeSignal" }] : []);
  isLoadingSignal = signal(false, ...ngDevMode ? [{ debugName: "isLoadingSignal" }] : []);
  loadErrorSignal = signal(false, ...ngDevMode ? [{ debugName: "loadErrorSignal" }] : []);
  posts = this.postsSignal.asReadonly();
  categories = this.categoriesSignal.asReadonly();
  filters = this.filtersSignal.asReadonly();
  sort_by = this.sortBySignal.asReadonly();
  isLoading = this.isLoadingSignal.asReadonly();
  loadError = this.loadErrorSignal.asReadonly();
  current_page = computed(() => this.current_pageSignal(), ...ngDevMode ? [{ debugName: "current_page" }] : []);
  filteredPosts = computed(() => {
    const posts = this.applyFilters(this.postsSignal(), this.filtersSignal());
    return this.applySorting(posts, this.sortBySignal());
  }, ...ngDevMode ? [{ debugName: "filteredPosts" }] : []);
  paginatedPosts = computed(() => {
    const posts = this.filteredPosts();
    const page = this.current_pageSignal();
    const pageSize = this.pageSizeSignal();
    const start = (page - 1) * pageSize;
    return posts.slice(start, start + pageSize);
  }, ...ngDevMode ? [{ debugName: "paginatedPosts" }] : []);
  total_pages = computed(() => Math.ceil(this.filteredPosts().length / this.pageSizeSignal()), ...ngDevMode ? [{ debugName: "total_pages" }] : []);
  loadPosts() {
    this.isLoadingSignal.set(true);
    this.loadErrorSignal.set(false);
    forkJoin({
      categories: this.fetchCategories(),
      posts: this.fetchPosts()
    }).subscribe({
      next: ({ categories, posts }) => {
        this.categoriesSignal.set(categories);
        this.postsSignal.set(posts);
        this.isLoadingSignal.set(false);
      },
      error: () => {
        this.loadErrorSignal.set(true);
        this.isLoadingSignal.set(false);
      }
    });
  }
  fetchCategories() {
    return this.http.get(`${this.API_URL}/api/get_all_post_categories`).pipe(timeout(this.REQUEST_TIMEOUT), map((res) => {
      if (res?.status === "success" && Array.isArray(res.categories)) {
        return this.mapBackendCategories(res.categories);
      }
      return [];
    }), catchError(() => of([])));
  }
  fetchPosts() {
    return this.http.post(`${this.API_URL}/api/get_all_posts`, {
      category: btoa("")
    }).pipe(timeout(this.REQUEST_TIMEOUT), map((res) => {
      if (res?.status === "success" && Array.isArray(res.posts)) {
        return res.posts;
      }
      return [];
    }), catchError(() => {
      this.loadErrorSignal.set(true);
      return of([]);
    }));
  }
  mapBackendCategories(backendCategories) {
    const lang = this.translate.currentLang || this.translate.defaultLang || "en";
    return backendCategories.map((bc) => ({
      id: bc.id,
      icon_src: getCategoryIcon(bc.id),
      color_class: CATEGORY_COLOR_MAP[bc.id] ?? DEFAULT_CATEGORY_COLOR,
      display_name: this.resolveName(bc, lang)
    }));
  }
  resolveName(bc, lang) {
    if (lang === "hu" && bc.name_hu)
      return bc.name_hu;
    if (lang === "de" && bc.name_de)
      return bc.name_de;
    return bc.name_en || bc.name_hu || bc.id;
  }
  getPostById(id, isAdmin = false, adminId = "", adminSessionToken = "") {
    const body = {
      post_id: btoa(id),
      admin: isAdmin ? 1 : 0
    };
    if (isAdmin && adminId && adminSessionToken) {
      body["admin_id"] = btoa(adminId);
      body["admin_session_token"] = btoa(adminSessionToken);
    }
    return this.http.post(`${this.API_URL}/api/get_post_by_id`, body).pipe(timeout(this.REQUEST_TIMEOUT), map((res) => res?.status === "success" ? res.post : null), catchError(() => {
      const cached = this.postsSignal().find((p) => p.id === id) ?? null;
      return of(cached);
    }));
  }
  incrementViews(postId, userId, sessionToken) {
    return this.http.post(`${this.API_URL}/api/increment_post_views_by_id`, {
      user_id: btoa(userId),
      session_token: btoa(sessionToken),
      post_id: btoa(postId)
    }).pipe(timeout(this.REQUEST_TIMEOUT), catchError(() => of(null)));
  }
  getComments(postId) {
    return this.http.post(`${this.API_URL}/api/get_post_comments_by_post_id`, { post_id: btoa(postId) }).pipe(timeout(this.REQUEST_TIMEOUT), map((res) => res?.status === "success" ? res.comments ?? [] : []), catchError(() => of([])));
  }
  addComment(postId, sesstoken, content) {
    return this.http.post(`${this.API_URL}/api/create_post_comment`, {
      post_id: btoa(postId),
      sesstoken: btoa(sesstoken),
      content: btoa(content)
    }).pipe(timeout(this.REQUEST_TIMEOUT));
  }
  getRelatedPosts(postId, limit = 6) {
    const current = this.postsSignal().find((p) => p.id === postId);
    if (!current)
      return of([]);
    const related = this.postsSignal().filter((p) => p.id !== postId && p.category_id === current.category_id).slice(0, limit);
    return of(related);
  }
  setFilters(filters) {
    this.filtersSignal.set(filters);
    this.current_pageSignal.set(1);
  }
  setSorting(sort_by) {
    this.sortBySignal.set(sort_by);
    this.current_pageSignal.set(1);
  }
  setPage(page) {
    if (page >= 1 && page <= this.total_pages()) {
      this.current_pageSignal.set(page);
    }
  }
  setPosts(posts) {
    this.postsSignal.set(posts);
    this.current_pageSignal.set(1);
  }
  applyFilters(posts, filters) {
    return posts.filter((post) => {
      if (filters.category_id && post.category_id !== filters.category_id)
        return false;
      if (filters.is_featured !== void 0 && post.is_featured !== filters.is_featured)
        return false;
      if (filters.search_query) {
        const query = filters.search_query.toLowerCase();
        const searchable = `${post.title} ${post.excerpt} ${post.content}`.toLowerCase();
        if (!searchable.includes(query))
          return false;
      }
      if (filters.tags && filters.tags.length > 0) {
        if (!filters.tags.some((tag) => post.tags.includes(tag)))
          return false;
      }
      return true;
    });
  }
  applySorting(posts, sort_by) {
    const sorted = [...posts];
    switch (sort_by) {
      case "newest":
        return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      case "oldest":
        return sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      case "most-viewed":
        return sorted.sort((a, b) => b.views - a.views);
      case "most-liked":
        return sorted.sort((a, b) => b.likes - a.likes);
      case "trending":
        return sorted.sort((a, b) => this.trendingScore(b) - this.trendingScore(a));
      default:
        return sorted;
    }
  }
  trendingScore(post) {
    const publishedMs = post.published_at ? new Date(post.published_at).getTime() : 0;
    const daysSince = publishedMs ? (Date.now() - publishedMs) / (1e3 * 60 * 60 * 24) : 999;
    const recency = Math.max(0, 7 - daysSince);
    const activity = post.views * 0.1 + post.likes * 2 + post.comment_count * 5;
    return recency * 10 + activity;
  }
  static \u0275fac = function ForumService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ForumService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ForumService, factory: _ForumService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ForumService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  ForumService
};
//# sourceMappingURL=chunk-IJ6OFOVF.js.map
