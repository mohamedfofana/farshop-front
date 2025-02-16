import { Component, computed, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';

import { MatIconModule } from '@angular/material/icon';
import { Address } from '../../../../core/model/db/address';
import { NgIf } from '@angular/common';
import { IDialogFormData } from '../../../../core/model/dto/common/dialog-form-data.model';
import { IDialogConfirmData } from '../../../../core/model/dto/common/dialog-confirm-data.model';
import { ConfirmPopupComponent } from '../../dialog/confirm-popup/confirm-popup.component';
import { AbstractOnDestroy } from '../../../../core/directives/unsubscriber/abstract.ondestroy';
import { catchError, take } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AddressService } from '../../../../core/services/http/addresses/address.service';
import { NotifierService } from '../../../../core/services/utils/notifier/notifier.service';
import { HttpErrorHandlerService } from '../../../../core/services/http/httpErrorHandler/http-error-handler.service';
import { AddressAddEditDialogComponent } from '../../dialog/address-add-edit-dialog/address-add-edit-dialog.component';

@Component({
  selector: 'app-address-view',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, NgIf],
  templateUrl: './address-view.component.html',
})
export class AddressViewComponent extends AbstractOnDestroy {
  address = input.required<Address>();
  reloadData = output<void>();
  dialog = inject(MatDialog);
  translate = inject(TranslateService);
  addressService = inject(AddressService);
  notifier = inject(NotifierService);
  httpErrorHandlerService = inject(HttpErrorHandlerService);
  dialogConfirm = inject(MatDialog);
  longAddressLine = computed(
    () => this.address().addressLine1 + this.address().addressLine2
  );

  remove() {
    let message: string = '';
    let title: string = '';
    const subMessage$ = this.translate
      .get('general.dialog.message.remove')
      .subscribe((successMsg: string) => {
        message = successMsg;
      });

    const subTitle$ = this.translate
      .get('general.dialog.confirm')
      .subscribe((successMsg: string) => {
        title = successMsg;
      });
    const dialogData: IDialogConfirmData = {
      message: message,
      title: title,
      action: 'delete',
    };

    let dialogDeleteRef = this.dialogConfirm.open(ConfirmPopupComponent, {
      data: dialogData,
    });

    let successMessage: string;
    const subSuccessMessage$ = this.translate
      .get('profile.tabs.address.form.successful.delete')
      .subscribe((successMsg: string) => {
        successMessage = successMsg;
      });
    let failureMessage: string;
    const subFailureMessage$ = this.translate
      .get('profile.tabs.address.form.failure.delete')
      .subscribe((successMsg: string) => {
        failureMessage = successMsg;
      });
    const afterClosed$ = dialogDeleteRef
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.subscriptions.push(
            this.addressService
              .delete(this.address().id)
              .pipe(
                catchError((error) => {
                  this.notifier.failure(failureMessage);
                  return this.httpErrorHandlerService.handle(error);
                })
              )
              .subscribe(() => {
                this.reloadData.emit();
                this.notifier.success(successMessage);
              })
          );
        }
      });

    this.subscriptions.push(afterClosed$);
    this.subscriptions.push(subMessage$);
    this.subscriptions.push(subTitle$);
    this.subscriptions.push(subSuccessMessage$);
    this.subscriptions.push(subFailureMessage$);
  }

  edit() {
    const dialogData: IDialogFormData<Address> = {
      new: false,
      entity: this.address(),
    };

    let dialogRef = this.dialog.open(AddressAddEditDialogComponent, {
      data: dialogData,
    });

    this.subscriptions.push(
      dialogRef
        .afterClosed()
        .pipe(take(1))
        .subscribe((newAddress: Address) => {
          if (newAddress) {
            this.address().name = newAddress.name;
            this.address().addressLine1 = newAddress.addressLine1;
            this.address().addressLine2 = newAddress.addressLine2;
            this.address().postalCode = newAddress.postalCode;
            this.address().city = newAddress.city;
            this.address().country = newAddress.country;
            this.address().state = newAddress.state;
          }
        })
    );
  }
}
