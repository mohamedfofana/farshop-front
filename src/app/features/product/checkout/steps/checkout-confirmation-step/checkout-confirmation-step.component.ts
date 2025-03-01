import { Component, input, model, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatStepper } from '@angular/material/stepper';
import { OrderDto } from '@app/core/model/dto/order/orderDto';
import { LoaderComponent } from '../../../../../shared/components/common/loader/loader.component';

@Component({
  selector: 'app-checkout-confirmation-step',
  standalone: true,
  imports: [MatButtonModule, LoaderComponent],
  templateUrl: './checkout-confirmation-step.component.html',
  styleUrl: './checkout-confirmation-step.component.scss',
})
export class CheckoutConfirmationStepComponent {
  isLoading = signal(false);
  stepper = input.required<MatStepper>();
  orderDto = model.required<OrderDto>();

  back() {
    this.stepper().previous();
  }
  confirm() {
    //this.stepper().next();
  }
}
