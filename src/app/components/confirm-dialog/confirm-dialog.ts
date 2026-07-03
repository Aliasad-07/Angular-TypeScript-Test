import { Component, input, output } from '@angular/core';

/**
 * ConfirmDialogComponent displays a modal confirmation dialog.
 * Used before destructive actions like deleting a product.
 * Uses Angular signals-based input/output API.
 */
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css'
})
export class ConfirmDialogComponent {
  /** Title displayed in the dialog header */
  title = input<string>('Confirm Action');

  /** Message body explaining what will happen */
  message = input<string>('Are you sure you want to proceed?');

  /** Emits true when user confirms, false when cancelled */
  confirmed = output<boolean>();

  /** Handle confirm button click */
  onConfirm(): void {
    this.confirmed.emit(true);
  }

  /** Handle cancel button click or backdrop click */
  onCancel(): void {
    this.confirmed.emit(false);
  }
}
