import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

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
  ];

  const isPublicEndpoint = publicEndpoints.some((endpoint) => req.url.includes(endpoint));

  let clonedRequest = req;
  if (token && !isPublicEndpoint) {
    clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  } else if (!isPublicEndpoint) {
    clonedRequest = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      },
    });
  }

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const errorType = error.error?.error;

        if (errorType === 'hianyzo_auth_header') {
          console.error('Missing authentication header');
          if (!isPublicEndpoint) {
            authService.logout();
            router.navigate(['/login'], {
              queryParams: { returnUrl: router.url },
            });
          }
        } else if (errorType === 'hibas_token') {
          console.error('Invalid or expired JWT token');
          authService.logout();
          router.navigate(['/login'], {
            queryParams: {
              returnUrl: router.url,
              message: 'session_expired',
            },
          });
        } else {
          console.error('Authentication error:', error.error);
        }
      }
      if (error.status === 403) {
        authService.logout();
        router.navigate(['/login']);
      }

      return throwError(() => error);
    }),
  );
};
