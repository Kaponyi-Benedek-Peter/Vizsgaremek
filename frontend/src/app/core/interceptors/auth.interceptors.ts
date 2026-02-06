import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  const publicEndpoints = [
    '/login',
    '/registration_request',
    '/registration_promise',
    '/chpass_request',
    '/chpass_promise',
    '/get_all_products',
  ];

  const isPublicEndpoint = publicEndpoints.some((endpoint) => req.url.includes(endpoint));

  if (token && !isPublicEndpoint) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedRequest);
  }

  return next(req);
};
