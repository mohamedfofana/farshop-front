import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { catchError } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormErrorComponent } from '../../common/form/form-error/form-error.component';
import { FormInputErrorComponent } from '../../common/form/form-input-error/form-input-error.component';
import { MatInputErrorComponent } from '../../common/form/mat-input-error/mat-input-error.component';
import { AddressTypeEnum } from '@core/model/enum/addressTypeEnum';
import { AddressService } from '@core/services/http/addresses/address.service';
import { AbstractOnDestroy } from '@core/directives/unsubscriber/abstract.ondestroy';
import { HttpErrorHandlerService } from '@core/services/http/httpErrorHandler/http-error-handler.service';
import { NotifierService } from '@core/services/utils/notifier/notifier.service';
import { Address } from '@core/model/db/address';
import { IDialogFormData } from '@core/model/dto/common/dialog-form-data.model';
import {
  ControlError,
  UtilsService,
} from '@core/services/utils/utils/utils.service';
import { AddressDto } from '@core/model/dto/address/addressDto';

@Component({
  selector: 'app-address-add-editdialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    MatDialogActions,
    MatOption,
    FormErrorComponent,
    FormInputErrorComponent,
    MatInputErrorComponent,
  ],
  templateUrl: './address-add-edit-dialog.component.html',
})
export class AddressAddEditDialogComponent extends AbstractOnDestroy {
  private readonly addressService = inject(AddressService);
  private readonly httpErrorHandlerService = inject(HttpErrorHandlerService);
  private readonly utilsService = inject(UtilsService);
  private readonly auth0Service = inject(AuthService);
  private readonly notifier = inject(NotifierService);
  private readonly translate = inject(TranslateService);
  public readonly dialogFormData: IDialogFormData<Address> =
    inject(MAT_DIALOG_DATA);

  readonly MIN_LENGTH_NAME = 2;
  readonly MAX_LENGTH_NAME = 50;

  addressForm!: FormGroup;
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.MIN_LENGTH_NAME),
    Validators.maxLength(this.MAX_LENGTH_NAME),
  ]);
  addressLine1FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.MIN_LENGTH_NAME),
    Validators.maxLength(this.MAX_LENGTH_NAME),
  ]);
  addressLine2FormControl = new FormControl('');
  cityFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.MIN_LENGTH_NAME),
    Validators.maxLength(this.MAX_LENGTH_NAME),
  ]);
  stateFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.MIN_LENGTH_NAME),
    Validators.maxLength(this.MAX_LENGTH_NAME),
  ]);
  postalCodeFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(7),
  ]);
  countryFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.MIN_LENGTH_NAME),
    Validators.maxLength(this.MAX_LENGTH_NAME),
  ]);
  typeFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.MIN_LENGTH_NAME),
    Validators.maxLength(this.MAX_LENGTH_NAME),
  ]);
  suffix = signal('-add');

  addressTypes = [
    { value: AddressTypeEnum.RESIDENTIAL },
    { value: AddressTypeEnum.BILLING },
    { value: AddressTypeEnum.DELIVERY },
  ];

  sumbitSuccessful = signal<boolean>(false);
  hasInputError = signal<boolean>(false);
  hasHttpError = signal<boolean>(false);
  errors = signal<ControlError[]>([]);

  customer = toSignal(this.auth0Service.user$);

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddressAddEditDialogComponent>
  ) {
    super();
    this.initForm();
  }

  initForm() {
    this.typeFormControl.setValue(this.addressTypes[0].value);
    if (!this.dialogFormData.new && this.dialogFormData.entity) {
      this.suffix.set('-update');
      this.nameFormControl.setValue(this.dialogFormData.entity.name);
      this.addressLine1FormControl.setValue(
        this.dialogFormData.entity.addressLine1
      );
      this.addressLine2FormControl.setValue(
        this.dialogFormData.entity.addressLine2
      );
      this.cityFormControl.setValue(this.dialogFormData.entity.city);
      this.stateFormControl.setValue(this.dialogFormData.entity.state);
      this.postalCodeFormControl.setValue(
        this.dialogFormData.entity.postalCode
      );
      this.countryFormControl.setValue(this.dialogFormData.entity.country);
      this.typeFormControl.setValue(this.dialogFormData.entity.type);
    }

    this.addressForm = this.formBuilder.group({
      name: this.nameFormControl,
      addressLine1: this.addressLine1FormControl,
      addressLine2: this.addressLine2FormControl,
      city: this.cityFormControl,
      state: this.stateFormControl,
      postalCode: this.postalCodeFormControl,
      country: this.stateFormControl,
      type: this.typeFormControl,
    });
  }

  submit(): void {
    this.hasInputError.set(false);
    this.hasHttpError.set(false);
    this.sumbitSuccessful.set(false);
    if (this.addressForm.valid) {
      let addressDto: AddressDto = this.addressForm.value;
      if (this.dialogFormData.new) {
        this.add(addressDto);
      } else {
        addressDto = { ...addressDto, id: this.dialogFormData.entity!.id };
        this.update(addressDto);
      }
    } else {
      this.hasInputError.set(true);
      this.errors.set(
        this.utilsService.getErrosFromFormGroup(this.addressForm)
      );
    }
  }

  update(addressDto: AddressDto) {
    let successMessage: string;
    const subMessage = this.translate
      .get('profile.tabs.address.form.successful.update')
      .subscribe((successMsg: string) => {
        successMessage = successMsg;
      });
    this.subscriptions.push(subMessage);
    const subSend = this.addressService
      .update(addressDto)
      .pipe(
        catchError((error) => {
          this.hasHttpError.set(true);
          return this.httpErrorHandlerService.handle(error);
        })
      )
      .subscribe(() => {
        this.sumbitSuccessful.set(true);
        this.notifier.success(successMessage);
        this.dialogRef.close(addressDto);
      });
    this.subscriptions.push(subSend);
  }

  add(addressDto: AddressDto) {
    let successMessage: string;
    const subMessage = this.translate
      .get('profile.tabs.address.form.successful.add')
      .subscribe((successMsg: string) => {
        successMessage = successMsg;
      });
    this.subscriptions.push(subMessage);
    const subSend = this.addressService
      .save(addressDto)
      .pipe(
        catchError((error) => {
          this.hasHttpError.set(true);
          return this.httpErrorHandlerService.handle(error);
        })
      )
      .subscribe(() => {
        this.sumbitSuccessful.set(true);
        this.notifier.success(successMessage);
        this.dialogRef.close(addressDto);
      });
    this.subscriptions.push(subSend);
  }
}
