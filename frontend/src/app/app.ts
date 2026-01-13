import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { IconBtn } from './shared/components/icon-btn/icon-btn';
import { PrimaryBtn } from './shared/components/primary-btn/primary-btn';
import { SecondaryBtn } from './shared/components/secondary-btn/secondary-btn';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}
