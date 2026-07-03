import { Injectable, signal, computed } from '@angular/core';

/** Represents a single toast notification */
export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

/**
 * NotificationService manages toast notifications.
 * Components call success/error/info to show feedback.
 * Toasts auto-dismiss after 4 seconds.
 */
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private nextId = 0;
  private _toasts = signal<Toast[]>([]);

  /** Read-only computed signal of active toasts */
  readonly toasts = computed(() => this._toasts());

  /** Show a success toast */
  success(message: string): void {
    this.addToast(message, 'success');
  }

  /** Show an error toast */
  error(message: string): void {
    this.addToast(message, 'error');
  }

  /** Show an info toast */
  info(message: string): void {
    this.addToast(message, 'info');
  }

  /** Remove a toast by ID */
  dismiss(id: number): void {
    this._toasts.update(toasts => toasts.filter(t => t.id !== id));
  }

  private addToast(message: string, type: Toast['type']): void {
    const id = this.nextId++;
    this._toasts.update(toasts => [...toasts, { id, message, type }]);

    // Auto-dismiss after 4 seconds
    setTimeout(() => this.dismiss(id), 4000);
  }
}
