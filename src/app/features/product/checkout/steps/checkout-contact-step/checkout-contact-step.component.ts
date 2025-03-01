import { Component, inject, input, model, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CustomerService } from '@app/core/services/http/customer/customer.service';
import { emailInputValidator } from '@app/core/validators/emailInputValidator';
import {
  ControlError,
  UtilsService,
} from '@app/core/services/utils/utils/utils.service';
import { nameInputPatternValidator } from '@app/core/validators/nameInputPatternValidator';
import { TranslateModule } from '@ngx-translate/core';
import { OrderDto } from '@app/core/model/dto/order/orderDto';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import { phonenumberInputPatternValidator } from '@app/core/validators/phonenumberInputPatternValidator';
import { LoaderComponent } from '../../../../../shared/components/common/loader/loader.component';
import { FormInputErrorComponent } from '../../../../../shared/components/common/form/form-input-error/form-input-error.component';
import { MatInputErrorComponent } from '../../../../../shared/components/common/form/mat-input-error/mat-input-error.component';

@Component({
  selector: 'app-checkout-contact-step',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule,
    LoaderComponent,
    FormInputErrorComponent,
    MatInputErrorComponent,
  ],
  templateUrl: './checkout-contact-step.component.html',
  styleUrl: './checkout-contact-step.component.css',
})
export class CheckoutContactStepComponent implements OnInit {
  isLoading = signal(false);
  stepper = input.required<MatStepper>();
  orderDto = model.required<OrderDto>();
  private readonly auth0Service = inject(AuthService);
  private readonly customerService = inject(CustomerService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly utilsService = inject(UtilsService);
  readonly startDate = new Date(1925, 0, 1);

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

  customer$ = this.auth0Service.user$.pipe(
    switchMap((user) => this.customerService.findByEmail(user?.email!))
  );

  constructor() {
    this.initForm();
  }

  initForm() {
    this.profileForm = this.formBuilder.group({
      firstname: this.firstnameFormControl,
      lastname: this.lastnameFormControl,
      email: this.emailFormControl,
      phonenumber: this.phonenumberFormControl,
    });
  }

  ngOnInit(): void {
    if (!this.orderDto().email) {
      // Order is not initialized yet
      this.isLoading.set(true);
      this.customer$.subscribe((customer) => {
        this.firstnameFormControl.setValue(customer.firstname);
        this.lastnameFormControl.setValue(customer.lastname);
        this.emailFormControl.setValue(customer.email);
        this.phonenumberFormControl.setValue(customer.phoneNumber || '');
        this.isLoading.set(false);
        this.orderDto.update((value) => {
          return {
            ...value,
            firstname: customer.firstname,
            lastname: customer.lastname,
            email: customer.email,
            phonenumber: customer.phoneNumber,
          };
        });
      });
    } else {
      this.firstnameFormControl.setValue(this.orderDto().firstname!);
      this.lastnameFormControl.setValue(this.orderDto().lastname!);
      this.emailFormControl.setValue(this.orderDto().email!);
      this.phonenumberFormControl.setValue(this.orderDto().phonenumber!);
    }
  }

  next(): void {
    this.hasInputError.set(false);
    this.hasHttpError.set(false);
    this.sumbitSuccessful.set(false);
    if (this.profileForm.valid) {
      let order: OrderDto = {
        firstname: this.firstnameFormControl.value!,
        lastname: this.lastnameFormControl.value!,
        email: this.emailFormControl.value!,
        phonenumber: this.phonenumberFormControl.value!,
      };
      const phonenumber = this.phonenumberFormControl.value;
      if (phonenumber && phonenumber !== '') {
        this.phonenumberFormControl.addValidators(
          phonenumberInputPatternValidator
        );
        this.phonenumberFormControl.updateValueAndValidity();

        if (this.phonenumberFormControl.valid) {
          order = {
            ...order,
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
      this.orderDto.update((value) => {
        return { ...value, order };
      });
      this.stepper().next();
    } else {
      this.handleInputError();
    }
  }
  private handleInputError() {
    this.hasInputError.set(true);

    this.errors.set(this.utilsService.getErrosFromFormGroup(this.profileForm));
  }
}
