import { Component } from '@angular/core';
import { IconBtn } from '../../icon-btn/icon-btn';
import { PrimaryBtn } from '../../primary-btn/primary-btn';

@Component({
  selector: 'app-footer-bottom',
  imports: [IconBtn, PrimaryBtn],
  templateUrl: './footer-bottom.html',
  styleUrl: './footer-bottom.css',
})
export class FooterBottom {}
