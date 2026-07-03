import { Component, inject } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

/**
 * ToastComponent renders active toast notifications.
 * Positioned fixed at top-right, shows color-coded messages
 * that auto-dismiss after 4 seconds.
 */
@Component({
  selector: 'app-toast',
  templateUrl: './toast.html',
  styleUrl: './toast.css'
})
export class ToastComponent {
  protected notificationService = inject(NotificationService);
}
