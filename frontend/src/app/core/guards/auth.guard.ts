import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isUserAuthenticated()) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  return authService.checkUserStateGuard().pipe(
    map((allowed) => {
      if (!allowed) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    }),
    catchError(() => of(true)),
  );
};

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isUserAuthenticated()) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  return authService.checkUserStateGuard().pipe(
    map((allowed) => {
      if (!allowed) {
        router.navigate(['/login']);
        return false;
      }
      if (!authService.isAdmin()) {
        router.navigate(['/home']);
        return false;
      }
      return true;
    }),
    catchError(() => {
      if (!authService.isAdmin()) {
        router.navigate(['/home']);
        return of(false);
      }
      return of(true);
    }),
  );
};

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  return !authService.isUserAuthenticated();
};
