import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  private readonly snackBar = inject(MatSnackBar);

  basicConfig: MatSnackBarConfig = {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'right',
  };

  readonly CLOSE = 'Close';

  success(message: string) {
    this.snackBar.open(message, this.CLOSE, {
      ...this.basicConfig,
      panelClass: ['success-snackbar'],
    });
  }

  failure(message: string) {
    this.snackBar.open(message, this.CLOSE, {
      ...this.basicConfig,
      panelClass: ['error-snackbar'],
    });
  }
}
