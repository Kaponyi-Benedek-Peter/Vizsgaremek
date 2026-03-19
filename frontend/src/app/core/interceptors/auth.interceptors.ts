import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');

  const publicEndpoints = [
    '/login_request',
    '/login_promise',
    '/registration_request',
    '/registration_promise',
    '/chpass_request',
    '/chpass_promise',
    '/get_all_products',
    '/get_all_featured_products',
    '/newsletter_subscription',
    '/get_all_product_categories',
    // Forum — public endpoints
    '/get_all_posts',
    '/get_post_by_id',
    '/get_post_by_slug',
    '/get_all_post_categories',
    '/increment_post_view_by_id',
    '/get_post_comments_by_post_id',
  ];

  const isPublicEndpoint = publicEndpoints.some((endpoint) => req.url.includes(endpoint));

  let clonedRequest = req.clone({
    setHeaders: { 'Content-Type': 'application/json' },
  });

  if (token && !isPublicEndpoint) {
    clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const errorType = error.error?.error;

        if (
          (errorType === 'hianyzo_auth_header' && !isPublicEndpoint) ||
          errorType === 'hibas_token'
        ) {
          const message = errorType === 'hibas_token' ? 'session_expired' : undefined;
          window.dispatchEvent(new CustomEvent('auth:force-logout', { detail: { message } }));
        }
      }

      if (error.status === 403) {
        router.navigate(['/login']);
      }

      return throwError(() => error);
    }),
  );
};
