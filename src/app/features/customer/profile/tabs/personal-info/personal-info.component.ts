import { Component, inject, input, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import moment from 'moment';
import { Customer } from '@core/model/db/customer';
import { CustomerService } from '@core/services/http/customer/customer.service';
import { AbstractOnDestroy } from '@core/directives/unsubscriber/abstract.ondestroy';
import { TranslateModule } from '@ngx-translate/core';
import {
  ControlError,
  UtilsService,
} from '@core/services/utils/utils/utils.service';
import { emailInputValidator } from '@core/validators/emailInputValidator';
import { catchError } from 'rxjs';
import { HttpErrorHandlerService } from '@core/services/http/httpErrorHandler/http-error-handler.service';
import { birthdateValidator } from '@core/validators/birthdateValidator';
import { nameInputPatternValidator } from '@core/validators/nameInputPatternValidator';
import { CustomerUpdateDto } from '@core/model/dto/customer/customerUpdateDto';
import { Constants } from '@core/model/enum/constants';
import { FormErrorComponent } from '@shared/components/common/form/form-error/form-error.component';
import { FormInputErrorComponent } from '@shared/components/common/form/form-input-error/form-input-error.component';
import { MatInputErrorComponent } from '@shared/components/common/form/mat-input-error/mat-input-error.component';
import { FormSuccessComponent } from '@shared/components/common/form/form-success/form-success.component';
import { phonenumberInputPatternValidator } from '@app/core/validators/phonenumberInputPatternValidator';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  providers: [],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    TranslateModule,
    FormErrorComponent,
    FormInputErrorComponent,
    MatInputErrorComponent,
    FormSuccessComponent,
  ],
  templateUrl: './personal-info.component.html',
})
export class PersonalInfoComponent extends AbstractOnDestroy implements OnInit {
  customer = input.required<Customer>();
  private readonly formBuilder = inject(FormBuilder);
  private readonly customerService = inject(CustomerService);
  private readonly httpErrorHandlerService = inject(HttpErrorHandlerService);
  private readonly utilsService = inject(UtilsService);

  profileForm!: FormGroup;
  readonly MIN_LENGTH_PHONENUMBER: number = 10;
  readonly MAX_LENGTH_PHONENUMBER: number = 10;
  readonly MIN_LENGTH_NAME: number = 2;
  readonly MAX_LENGTH_NAME: number = 50;
  firstnameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.MIN_LENGTH_NAME),
    Validators.maxLength(this.MAX_LENGTH_NAME),
    nameInputPatternValidator,
  ]);
  lastnameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.MIN_LENGTH_NAME),
    Validators.maxLength(this.MAX_LENGTH_NAME),
    nameInputPatternValidator,
  ]);
  birthdateFormControl = new FormControl(moment(), [birthdateValidator]);
  emailFormControl = new FormControl<string>('', [
    Validators.required,
    emailInputValidator,
  ]);
  phonenumberFormControl = new FormControl<string>('', [
    Validators.minLength(this.MIN_LENGTH_PHONENUMBER),
  ]);

  sumbitSuccessful = signal<boolean>(false);
  hasInputError = signal<boolean>(false);
  hasHttpError = signal<boolean>(false);
  errors = signal<ControlError[]>([]);

  constructor() {
    super();
    this.initForm();
  }

  initForm() {
    this.profileForm = this.formBuilder.group({
      firstname: this.firstnameFormControl,
      lastname: this.lastnameFormControl,
      birthdate: this.birthdateFormControl,
      email: this.emailFormControl,
      phonenumber: this.phonenumberFormControl,
    });
  }

  ngOnInit(): void {
    const birthdate = moment(this.customer().birthdate, Constants.DATE_FORMAT);

    this.firstnameFormControl.setValue(this.customer().firstname);
    this.lastnameFormControl.setValue(this.customer().lastname);
    this.birthdateFormControl.setValue(birthdate);
    this.emailFormControl.setValue(this.customer().email);
    if (this.customer().phoneNumber) {
      this.phonenumberFormControl.setValue(this.customer().phoneNumber!);
    }
  }

  submit(): void {
    this.hasInputError.set(false);
    this.hasHttpError.set(false);
    this.sumbitSuccessful.set(false);
    if (this.profileForm.valid) {
      let customerDto: CustomerUpdateDto = {
        firstname: this.firstnameFormControl.value!,
        lastname: this.lastnameFormControl.value!,
        birthdate: moment(this.birthdateFormControl.value).format(
          Constants.DATE_FORMAT
        ),
        email: this.emailFormControl.value!,
      };
      const phonenumber = this.phonenumberFormControl.value;
      if (phonenumber && phonenumber !== '') {
        this.phonenumberFormControl.addValidators(
          phonenumberInputPatternValidator
        );
        this.phonenumberFormControl.updateValueAndValidity();
        if (this.phonenumberFormControl.valid) {
          customerDto = {
            ...customerDto,
            phonenumber: phonenumber,
          };
        } else {
          this.handleInputError();
          this.phonenumberFormControl.removeValidators(
            phonenumberInputPatternValidator
          );
          return;
        }
      }

      const subSend = this.customerService
        .update(customerDto)
        .pipe(
          catchError((error) => {
            this.hasHttpError.set(true);
            return this.httpErrorHandlerService.handle(error);
          })
        )
        .subscribe(() => {
          this.sumbitSuccessful.set(true);
        });
      this.subscriptions.push(subSend);
    } else {
      this.handleInputError();
    }
  }

  private handleInputError() {
    this.hasInputError.set(true);

    this.errors.set(this.utilsService.getErrosFromFormGroup(this.profileForm));
  }
}
