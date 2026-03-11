import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Auth Guard - Managing guarded routes
 *
 * USE:
 * {
 *   path: 'profile',
 *   component: ProfileComponent,
 *   canActivate: [authGuard]
 * }
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isUserAuthenticated()) {
    return true;
  }

  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url },
  });

  return false;
};

/**
 * Admin Guard - Admin privilege check
 *
 * USE:
 * {
 *   path: 'admin',
 *   component: AdminComponent,
 *   canActivate: [adminGuard]
 * }
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isUserAuthenticated()) {
    router.navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }

  if (authService.isAdmin()) {
    return true;
  }

  router.navigate(['/home']);
  return false;
};

/**
 * Guest Guard - Only unauthenticated (login, register oldalak).
 */
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  if (authService.isUserAuthenticated()) {
    return false;
  }

  return true;
};
