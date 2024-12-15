import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-search-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogContent, MatDialogActions],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-dialog-content>
      <div class="row g-1 align-items-center">
        <div class="col-auto">
          <input
            type="text"
            class="form-control input-sm"
            placeholder="Search ..."
          />
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-light">
            <i class="bi bi-search h5 text-dark"></i>
          </button>
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions class="py-0">
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      :host {
        display: block;
        background: #fff;
        border-radius: 2px;
      }
    `,
  ],
})
export class SearchDialogComponent {
  readonly dialogRef = inject(MatDialogRef<SearchDialogComponent>);
}
