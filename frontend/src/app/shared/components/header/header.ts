import { Component } from '@angular/core';
import { PrimaryBtn } from '../primary-btn/primary-btn';
import { IconBtn } from '../icon-btn/icon-btn';
import { AppRoutingModule } from '../../../app.routes';

@Component({
  selector: 'app-header',
  imports: [PrimaryBtn, IconBtn, AppRoutingModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
