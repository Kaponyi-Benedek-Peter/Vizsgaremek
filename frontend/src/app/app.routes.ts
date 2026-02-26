import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { Bracket } from './pages/bracket/bracket';
import { Email } from './pages/email/email';
import { Forum } from './pages/forum/forum';
import { Legal } from './pages/legal/legal';
import { Login } from './pages/login/login';
import { NotFound } from './pages/not-found/not-found';
import { Products } from './pages/products/products';
import { Profile } from './pages/profile/profile';
import { Purchase } from './pages/purchase/purchase';
import { Register } from './pages/register/register';
import { authGuard, adminGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'forum', component: Forum },
  { path: 'products', component: Products },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./pages/product-detail/product-detail').then((m) => m.ProductDetail),
  },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'purchase', component: Purchase, canActivate: [authGuard] },
  { path: 'legal', component: Legal },
  { path: 'bracket', component: Bracket },
  { path: 'admin', component: Admin, canActivate: [adminGuard] },
  {
    path: 'forum/:slug',
    loadComponent: () => import('./pages/forum-detail/forum-detail').then((m) => m.ForumDetail),
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
  { path: 'email', loadComponent: () => import('./pages/email/email').then((m) => m.Email) },
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
    path: 'login-promise',
    loadComponent: () => import('./pages/login-promise/login-promise').then((m) => m.LoginPromise),
  },
  {
    path: 'delacc-promise',
    loadComponent: () =>
      import('./pages/delacc-promise/delacc-promise').then((m) => m.DelaccPromise),
    canActivate: [authGuard],
  },
  { path: '**', component: NotFound },
];
