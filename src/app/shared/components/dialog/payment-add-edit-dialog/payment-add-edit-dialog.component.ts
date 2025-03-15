import { PaymentDto } from './../../../../core/model/dto/payment/paymentDto';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AbstractOnDestroy } from '@app/core/directives/unsubscriber/abstract.ondestroy';
import { PaymentMethod } from '@app/core/model/db/paymentMethod';
import { IDialogFormData } from '@app/core/model/dto/common/dialog-form-data.model';
import { HttpErrorHandlerService } from '@app/core/services/http/httpErrorHandler/http-error-handler.service';
import { NotifierService } from '@app/core/services/utils/notifier/notifier.service';
import {
  ControlError,
  UtilsService,
} from '@app/core/services/utils/utils/utils.service';
import { AuthService } from '@auth0/auth0-angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormErrorComponent } from '../../common/form/form-error/form-error.component';
import { FormInputErrorComponent } from '../../common/form/form-input-error/form-input-error.component';
import moment from 'moment';
import { creditCardExpirationValidator } from '@app/core/validators/creditCardExpirationValidator';
import { Constants } from '@app/core/model/enum/constants';
import { MatInputErrorComponent } from '../../common/form/mat-input-error/mat-input-error.component';
import { PaymentService } from '@app/core/services/http/payment/payment.service';
import { catchError } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-payment-add-edit-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    TranslateModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    MatDialogActions,
    FormErrorComponent,
    FormInputErrorComponent,
    MatInputErrorComponent,
  ],
  templateUrl: './payment-add-edit-dialog.component.html',
})
export class PaymentAddEditDialogComponent extends AbstractOnDestroy {
  private readonly paymentMethodService = inject(PaymentService);
  private readonly httpErrorHandlerService = inject(HttpErrorHandlerService);
  private readonly utilsService = inject(UtilsService);
  private readonly auth0Service = inject(AuthService);
  private readonly notifier = inject(NotifierService);
  private readonly translate = inject(TranslateService);
  public readonly dialogFormData: IDialogFormData<PaymentMethod> =
    inject(MAT_DIALOG_DATA);

  readonly MIN_LENGTH_NAME = 2;
  readonly MAX_LENGTH_NAME = 50;

  paymentForm!: FormGroup;
  cardNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.MIN_LENGTH_NAME),
    Validators.maxLength(this.MAX_LENGTH_NAME),
  ]);
  cardHolderNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.MIN_LENGTH_NAME),
    Validators.maxLength(this.MAX_LENGTH_NAME),
  ]);
  cardNumberFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(16),
    Validators.maxLength(16),
  ]);
  expirationFormControl = new FormControl(moment(), [
    creditCardExpirationValidator,
  ]);
  ccvFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(3),
  ]);

  suffix = signal('-add');

  sumbitSuccessful = signal<boolean>(false);
  hasInputError = signal<boolean>(false);
  hasHttpError = signal<boolean>(false);
  errors = signal<ControlError[]>([]);

  customer = toSignal(this.auth0Service.user$);

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PaymentAddEditDialogComponent>
  ) {
    super();
    this.initForm();
  }

  initForm() {
    if (!this.dialogFormData.new && this.dialogFormData.entity) {
      const expiration = moment(
        this.dialogFormData.entity.expiration,
        Constants.DATE_FORMAT
      );
      this.suffix.set('-update');
      this.cardNameFormControl.setValue(this.dialogFormData.entity.cardName);
      this.cardHolderNameFormControl.setValue(
        this.dialogFormData.entity.cardHolderName
      );
      this.cardNumberFormControl.setValue(
        this.dialogFormData.entity.cardNumber
      );
      this.expirationFormControl.setValue(expiration);
    }

    this.paymentForm = this.formBuilder.group({
      cardName: this.cardNameFormControl,
      cardHolderName: this.cardHolderNameFormControl,
      cardNumber: this.cardNumberFormControl,
      expiration: this.expirationFormControl,
      ccv: this.ccvFormControl,
    });
  }

  submit(): void {
    this.hasInputError.set(false);
    this.hasHttpError.set(false);
    this.sumbitSuccessful.set(false);
    if (this.paymentForm.valid) {
      let paymentDto: PaymentDto = this.paymentForm.value;
      if (this.dialogFormData.new) {
        this.add(paymentDto);
      } else {
        paymentDto = { ...paymentDto, id: this.dialogFormData.entity!.id };
        this.update(paymentDto);
      }
    } else {
      this.hasInputError.set(true);
      this.errors.set(
        this.utilsService.getErrosFromFormGroup(this.paymentForm)
      );
    }
  }

  update(paymentDto: PaymentDto) {
    let successMessage: string;
    const subMessage = this.translate
      .get('profile.tabs.payment-methods.form.successful.update')
      .subscribe((successMsg: string) => {
        successMessage = successMsg;
      });
    this.subscriptions.push(subMessage);
    const subSend = this.paymentMethodService
      .update(paymentDto)
      .pipe(
        catchError((error) => {
          this.hasHttpError.set(true);
          return this.httpErrorHandlerService.handle(error);
        })
      )
      .subscribe(() => {
        this.sumbitSuccessful.set(true);
        this.notifier.success(successMessage);
        this.dialogRef.close(paymentDto);
      });
    this.subscriptions.push(subSend);
  }

  add(paymentDto: PaymentDto) {
    let successMessage: string;
    const subMessage = this.translate
      .get('profile.tabs.payment-methods.form.successful.add')
      .subscribe((successMsg: string) => {
        successMessage = successMsg;
      });
    this.subscriptions.push(subMessage);
    const subSend = this.paymentMethodService
      .save(paymentDto)
      .pipe(
        catchError((error) => {
          this.hasHttpError.set(true);
          return this.httpErrorHandlerService.handle(error);
        })
      )
      .subscribe(() => {
        this.sumbitSuccessful.set(true);
        this.notifier.success(successMessage);
        this.dialogRef.close(paymentDto);
      });
    this.subscriptions.push(subSend);
  }
}
