import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { Blog } from './pages/blog/blog';
import { Bracket } from './pages/bracket/bracket';
import { Email } from './pages/email/email';
import { Forum } from './pages/forum/forum';
import { Legal } from './pages/legal/legal';
import { Login } from './pages/login/login';
import { NotFound } from './pages/not-found/not-found';
import { PasswordChange } from './pages/password-change/password-change';
import { Products } from './pages/products/products';
import { Profile } from './pages/profile/profile';
import { Purchase } from './pages/purchase/purchase';
import { Register } from './pages/register/register';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'forum', component: Forum },
  { path: 'products', component: Products },
  { path: 'profile', component: Profile },
  { path: 'purchase', component: Purchase },
  { path: '**', component: NotFound },
  { path: 'legal', component: Legal },
  { path: 'bracket', component: Bracket },
  { path: 'admin', component: Admin },
  { path: 'password-change', component: PasswordChange },
  { path: 'email', component: Email },
  { path: 'blog', component: Blog },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
