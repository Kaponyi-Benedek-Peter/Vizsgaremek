import { Component, inject } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  private toastService = inject(ToastService);
  toasts = this.toastService.toasts$;

  close(id: string): void {
    this.toastService.remove(id);
  }
}
