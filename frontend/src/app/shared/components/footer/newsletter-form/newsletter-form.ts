import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { ICONS, IMAGES } from '../../../../core/constants/visuals';
import { environment } from '../../../../../environments/environment';
import { ToastService } from '../../../../core/services/toast.service';

interface SocialLink {
  name: string;
  icon: string;
  url: string | null;
}

@Component({
  selector: 'app-newsletter-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './newsletter-form.html',
  styleUrl: './newsletter-form.css',
})
export class NewsletterForm {
  private http = inject(HttpClient);
  private toastService = inject(ToastService);
  private readonly API_URL = environment.baseURL;

  ICONS = ICONS;
  IMAGES = IMAGES;
  email = '';
  isSubmitting = false;
  activeSocialTooltip: string | null = null;

  socialLinks: SocialLink[] = [
    { name: 'Facebook', icon: ICONS.facebook, url: null },
    { name: 'Instagram', icon: ICONS.instagram, url: null },
    { name: 'X (Twitter)', icon: ICONS.x, url: null },
  ];

  toggleSocialTooltip(name: string): void {
    this.activeSocialTooltip = this.activeSocialTooltip === name ? null : name;
    if (this.activeSocialTooltip) {
      setTimeout(() => {
        if (this.activeSocialTooltip === name) {
          this.activeSocialTooltip = null;
        }
      }, 3000);
    }
  }

  onSubmit(): void {
    if (!this.email || this.isSubmitting) return;

    this.isSubmitting = true;

    const payload = {
      email: btoa(unescape(encodeURIComponent(this.email))),
      news_level: btoa('all'),
    };

    this.http
      .post<{
        statuscode: string;
        status: string;
      }>(`${this.API_URL}/api/newsletter_subscription`, payload)
      .subscribe({
        next: (response) => {
          if (response.statuscode === '200') {
            this.toastService.show('footer.newsletter_success', 'success');
            this.email = '';
          } else {
            this.toastService.show('footer.newsletter_error', 'error');
          }
          this.isSubmitting = false;
        },
        error: () => {
          this.toastService.show('footer.newsletter_error', 'error');
          this.isSubmitting = false;
        },
      });
  }
}
