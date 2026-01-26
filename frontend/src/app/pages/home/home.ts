import { Component } from '@angular/core';
import { Slide } from '../../shared/components/slide/slide';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Slide],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
