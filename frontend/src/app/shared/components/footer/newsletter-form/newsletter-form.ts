import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ICONS, IMAGES } from '../../../../core/constants/visuals';

interface SocialLink {
  name: string;
  icon: string;
  url: string | null; // null = no link yet
}

@Component({
  selector: 'app-newsletter-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './newsletter-form.html',
  styleUrl: './newsletter-form.css',
})
export class NewsletterForm {
  ICONS = ICONS;
  IMAGES = IMAGES;
  email = '';
  activeSocialTooltip: string | null = null;

  // Set url to null for links that don't exist yet.
  // When a real URL is added, the icon becomes a normal link.
  socialLinks: SocialLink[] = [
    { name: 'Facebook', icon: ICONS.facebook, url: null },
    { name: 'Instagram', icon: ICONS.instagram, url: null },
    { name: 'X (Twitter)', icon: ICONS.x, url: null },
  ];

  toggleSocialTooltip(name: string): void {
    this.activeSocialTooltip = this.activeSocialTooltip === name ? null : name;
    // Auto-hide after 3 seconds
    if (this.activeSocialTooltip) {
      setTimeout(() => {
        if (this.activeSocialTooltip === name) {
          this.activeSocialTooltip = null;
        }
      }, 3000);
    }
  }

  onSubmit(): void {
    if (this.email) {
      console.log('Newsletter subscription:', this.email);
      // TODO: Backend API call
      this.email = '';
    }
  }
}
