import { Component, input, model, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatStepper } from '@angular/material/stepper';
import { OrderDto } from '@app/core/model/dto/order/orderDto';
import { LoaderComponent } from "../../../../../shared/components/common/loader/loader.component";

@Component({
  selector: 'app-checkout-payment-step',
  standalone: true,
  imports: [MatButtonModule, LoaderComponent],
  templateUrl: './checkout-payment-step.component.html',
  styleUrl: './checkout-payment-step.component.css'
})
export class CheckoutPaymentStepComponent {
  isLoading = signal(false);
  stepper = input.required<MatStepper>();
  orderDto = model.required<OrderDto>();

  back() {
    this.stepper().previous();
  }
  next() {
    this.stepper().next();
  }
}
