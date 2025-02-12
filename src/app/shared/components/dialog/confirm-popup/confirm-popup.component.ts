import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { IDialogConfirmData } from '../../../../core/model/dto/common/dialog-confirm-data.model';

@Component({
  selector: 'app-confirm-popup',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, TranslateModule],
  templateUrl: './confirm-popup.component.html',
  styles: ``,
})
export class ConfirmPopupComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmPopupComponent>);
  public readonly dialogFormData: IDialogConfirmData =
    inject(MAT_DIALOG_DATA);
    
  remove() {
    this.dialogRef.close(true);
  }
}
