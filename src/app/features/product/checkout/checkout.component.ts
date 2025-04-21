import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { CheckoutAddressesStepComponent } from './steps/checkout-addresses-step/checkout-addresses-step.component';
import { CheckoutContactStepComponent } from './steps/checkout-contact-step/checkout-contact-step.component';
import { CheckoutPaymentStepComponent } from './steps/checkout-payment-step/checkout-payment-step.component';
import { CartComponent } from '@app/shared/components/product/cart/cart.component';
import { ThemeButtonComponent } from '../../../shared/components/common/buttons/theme-button/theme-button.component';
import { SecureCheckoutComponent } from '../../../shared/components/common/secure-checkout/secure-checkout.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { OrderDto } from '@app/core/model/dto/order/out/orderDto';

@Component({
  selector: 'app-checkout',
  standalone: true,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
  imports: [
    MatStepperModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CartComponent,
    CheckoutAddressesStepComponent,
    CheckoutContactStepComponent,
    CheckoutPaymentStepComponent,
    ThemeButtonComponent,
    SecureCheckoutComponent,
  ],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  private readonly formBuilder = inject(FormBuilder);
  orderDto = signal<OrderDto>({});

  contactFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  deliveryFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  paymentFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
}
