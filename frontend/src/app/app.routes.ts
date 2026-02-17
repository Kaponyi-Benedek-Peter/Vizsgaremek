import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { Blog } from './pages/blog/blog';
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
import { Test } from './pages/test/test';

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
  { path: 'profile', component: Profile },
  { path: 'purchase', component: Purchase },
  { path: 'legal', component: Legal },
  { path: 'bracket', component: Bracket },
  { path: 'admin', component: Admin },
  { path: 'blog', component: Blog },
  { path: 'login', loadComponent: () => import('./pages/login/login').then((m) => m.Login) },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then((m) => m.Register),
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
  { path: 'test', component: Test },
  { path: '**', component: NotFound },
];
