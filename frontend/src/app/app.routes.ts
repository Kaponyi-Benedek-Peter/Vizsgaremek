import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { authGuard, adminGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  {
    path: 'forum',
    loadComponent: () => import('./pages/forum/forum').then((m) => m.Forum),
  },
  {
    path: 'forum/:id',
    loadComponent: () => import('./pages/forum-detail/forum-detail').then((m) => m.ForumDetail),
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products').then((m) => m.Products),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./pages/product-detail/product-detail').then((m) => m.ProductDetail),
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile),
    canActivate: [authGuard],
  },
  {
    path: 'purchase',
    loadComponent: () => import('./pages/purchase/purchase').then((m) => m.Purchase),
    canActivate: [authGuard],
  },
  {
    path: 'legal',
    loadComponent: () => import('./pages/legal/legal').then((m) => m.Legal),
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin').then((m) => m.Admin),
    canActivate: [adminGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then((m) => m.Register),
    canActivate: [guestGuard],
  },
  {
    path: 'login-promise',
    loadComponent: () => import('./pages/login-promise/login-promise').then((m) => m.LoginPromise),
  },
  {
    path: 'registration-promise',
    loadComponent: () =>
      import('./pages/registration-promise/registration-promise').then(
        (m) => m.RegistrationPromise,
      ),
  },
  {
    path: 'password-reset-request',
    loadComponent: () =>
      import('./pages/password-reset-request/password-reset-request').then(
        (m) => m.PasswordResetRequest,
      ),
  },
  {
    path: 'password-reset',
    loadComponent: () =>
      import('./pages/password-reset/password-reset').then((m) => m.PasswordReset),
  },
  {
    path: 'delacc-promise',
    loadComponent: () =>
      import('./pages/delacc-promise/delacc-promise').then((m) => m.DelaccPromise),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
