import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ROUTE_PATH } from '../../../../core/config/routes/routesConfig';
import { FormsModule } from '@angular/forms';
import { FormInputErrorComponent } from '../../common/form-input-error/form-input-error.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-search-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogContent,
    FormsModule,
    FormInputErrorComponent,
    TranslateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-dialog-content class="rounded">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="{{ 'general.input.search.placeholder' | translate }}"
          aria-describedby="button-search"
          (keydown.enter)="search()"
          [(ngModel)]="searchText"
          size="30"
          required
        />
        <button
          class="btn button-theme bg-app-theme-color"
          type="button"
          id="button-search"
          (click)="search()"
        >
          <i class="bi bi-search h5 text-white "></i>
        </button>
      </div>
      @if(hasError()){
      <app-form-input-error
        [inputError]="
          'general.input.search.error' | translate : { letterCount: MIN_LENGTH }
        "
      />
      }
    </mat-dialog-content>
  `,
})
export class SearchDialogComponent {
  readonly router = inject(Router);

  readonly dialogRef = inject(MatDialogRef<SearchDialogComponent>);
  readonly MIN_LENGTH: number = 3;
  searchText: string = '';

  hasError = signal<boolean>(false);

  search() {
    this.hasError.set(this.searchText.length < this.MIN_LENGTH);

    if (!this.hasError()) {
      const url = ROUTE_PATH.PRODUCT_SEARCH.replace(':text', this.searchText);
      this.dialogRef.close();
      this.router.navigateByUrl(url);
    } else {
      this.hasError.set(true);
    }
  }
}
