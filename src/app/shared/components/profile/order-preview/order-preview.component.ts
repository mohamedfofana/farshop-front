import { Component, computed, inject, input, signal } from '@angular/core';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { OrderProgressComponent } from '../../product/order-progress/order-progress.component';
import { FindOrderDto } from '@app/core/model/dto/order/in/findOrderDto';
import { FileService } from '@app/core/services/utils/file/file.service';
import { OrderService } from '@app/core/services/http/order/order.service';
import { AbstractOnDestroy } from '@app/core/directives/unsubscriber/abstract.ondestroy';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { catchError } from 'rxjs';
import { HttpErrorHandlerService } from '@app/core/services/http/httpErrorHandler/http-error-handler.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IDialogConfirmData } from '@app/core/model/dto/common/dialog-confirm-data.model';
import { ConfirmPopupComponent } from '../../dialog/confirm-popup/confirm-popup.component';
import { OrderProductComponent } from '../order-product/order-product.component';
import { OrderStatus } from '@app/core/model/enum/OrderStatus';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order-preview',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    OrderProgressComponent,
    OrderProductComponent,
    TranslateModule,
    MatButtonModule,
    NgClass,
  ],
  templateUrl: './order-preview.component.html',
})
export class OrderPreviewComponent extends AbstractOnDestroy {
  order = input.required<FindOrderDto>();
  fileService = inject(FileService);
  orderService = inject(OrderService);
  translate = inject(TranslateService);
  dialogConfirm = inject(MatDialog);
  httpErrorHandlerService = inject(HttpErrorHandlerService);
  httpError = signal(false);
  message = signal('');
  action = signal('');
  successMessage = signal('');
  failureMessage = signal('');
  confirmMessage = signal('');
  confirmTitle = signal('');
  canBeCancelled = computed(() => this.order().status === OrderStatus.APPROVED);
  canBeReturned = computed(() => this.order().status === OrderStatus.DELIVERED);
  badgeStatusType = computed(() =>
    this.order().status === OrderStatus.CANCELED ||
    this.order().status === OrderStatus.RETURNED
      ? 'text-bg-danger'
      : this.order().status === OrderStatus.DELIVERED
      ? 'text-bg-success'
      : 'text-bg-warning'
  );

  downloadInvoice() {
    this.fileService.savePdfFromBase64(
      this.order().invoice.invoiceData,
      this.order().invoice.invoiceNumber
    );
  }

  cancel() {
    this.action.set('cancel-order');
    this.httpError.set(false);
    this.initMessages();
    const afterClosed$ = this.getDialogRef()
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.subscriptions.push(
            this.orderService
              .cancel(this.order().id)
              .pipe(
                catchError((error) => {
                  this.httpError.set(true);
                  this.message.set(this.failureMessage());
                  return this.httpErrorHandlerService.handle(error);
                })
              )
              .subscribe(() => this.message.set(this.successMessage()))
          );
        }
      });
    this.subscriptions.push(afterClosed$);
  }

  return() {
    this.action.set('return-order');
    this.httpError.set(false);
    this.initMessages();
    const afterClosed$ = this.getDialogRef()
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.subscriptions.push(
            this.orderService
              .return(this.order().id)
              .pipe(
                catchError((error) => {
                  this.httpError.set(true);
                  this.message.set(this.failureMessage());
                  return this.httpErrorHandlerService.handle(error);
                })
              )
              .subscribe(() => this.message.set(this.successMessage()))
          );
        }
      });
    this.subscriptions.push(afterClosed$);
  }

  private initMessages() {
    const subMessage$ = this.translate
      .get('general.dialog.message.order.'.concat(this.action()))
      .subscribe((successMsg: string) => {
        this.confirmMessage.set(successMsg);
      });

    const subTitle$ = this.translate
      .get('general.dialog.confirm')
      .subscribe((successMsg: string) => {
        this.confirmTitle.set(successMsg);
      });

    const subSuccessMessage$ = this.translate
      .get('profile.tabs.orders.'.concat(this.action()).concat('.success'))
      .subscribe((successMsg: string) => {
        this.successMessage.set(successMsg);
      });
    const subFailureMessage$ = this.translate
      .get('profile.tabs.orders.'.concat(this.action()).concat('.error'))
      .subscribe((successMsg: string) => {
        this.failureMessage.set(successMsg);
      });

    this.subscriptions.push(subMessage$);
    this.subscriptions.push(subTitle$);
    this.subscriptions.push(subSuccessMessage$);
    this.subscriptions.push(subFailureMessage$);
  }

  private getDialogRef(): MatDialogRef<ConfirmPopupComponent> {
    const dialogData: IDialogConfirmData = {
      message: this.confirmMessage(),
      title: this.confirmTitle(),
      action: this.action(),
    };

    return this.dialogConfirm.open(ConfirmPopupComponent, {
      data: dialogData,
    });
  }
}
