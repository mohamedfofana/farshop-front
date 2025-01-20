import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  private _snackBar = inject(MatSnackBar);

  success(message: string) {
    this._snackBar.open(message, 'Close');
  }

  failure(message: string) {
    this._snackBar.open(message, 'Close');
  }
}
