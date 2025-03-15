import { Component, inject, input, model, OnInit, signal } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { OrderDto } from '@app/core/model/dto/order/orderDto';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AddressService } from '@app/core/services/http/addresses/address.service';
import { Address } from '@app/core/model/db/address';
import { LoaderComponent } from '../../../../../shared/components/common/loader/loader.component';
import { MatButtonModule } from '@angular/material/button';
import { AddressStep } from '@app/core/model/types/addressStep';
import { AddressSelectorComponent } from '../../../../../shared/components/checkout/address-selector/address-selector.component';
import { ControlError } from '@app/core/services/utils/utils/utils.service';
import { FormInputErrorComponent } from '../../../../../shared/components/common/form/form-input-error/form-input-error.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout-addresses-step',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    MatButtonModule,
    LoaderComponent,
    AddressSelectorComponent,
    FormInputErrorComponent,
  ],
  templateUrl: './checkout-addresses-step.component.html',
})
export class CheckoutAddressesStepComponent implements OnInit {
  isLoading = signal(false);
  stepper = input.required<MatStepper>();
  orderDto = model.required<OrderDto>();
  addressService = inject(AddressService);
  addresses = signal<AddressStep[]>([]);
  selectedDeliveryAddress!: Address;
  selectedBillingAddress!: Address;
  hasInputError = signal<boolean>(false);
  errors = signal<ControlError[]>([]);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.addressService.findAll().subscribe((addressList) => {
      const list: AddressStep[] = [];
      this.addresses.set(
        addressList.map((ad) => {
          return {
            ...ad,
            inline:
              ad.addressLine1 +
              ' ' +
              ad.addressLine2 +
              ', ' +
              ad.city +
              ', ' +
              ad.state +
              ' ' +
              ad.postalCode,
          };
        })
      );
      this.isLoading.set(false);
    });
  }

  back() {
    this.stepper().previous();
  }
  next() {
    this.hasInputError.set(false);
    this.errors.set([]);
    if (!this.selectedDeliveryAddress) {
      const error: ControlError = {
        control: 'delivery',
        error: 'required',
        value: '',
      };
      this.errors.update((value) => [...value, error]);
      this.orderDto.update((value) => {
        return { ...value, deliveryAddress: undefined };
      });
    } else {
      this.orderDto.update((value) => {
        return { ...value, deliveryAddress: this.selectedDeliveryAddress };
      });
    }
    if (!this.selectedBillingAddress) {
      const error: ControlError = {
        control: 'billing',
        error: 'required',
        value: '',
      };
      this.errors.update((value) => [...value, error]);
      this.orderDto.update((value) => {
        return { ...value, billingAddress: undefined };
      });
    } else {
      this.orderDto.update((value) => {
        return { ...value, billingAddress: this.selectedBillingAddress };
      });
    }

    if (this.errors().length > 0) {
      this.hasInputError.set(true);
    } else {
      this.stepper().next();
    }
  }
}
