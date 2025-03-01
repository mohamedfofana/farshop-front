import { Component, inject, input, model, OnInit, signal } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { OrderDto } from '@app/core/model/dto/order/orderDto';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AddressService } from '@app/core/services/http/addresses/address.service';
import { Address } from '@app/core/model/db/address';
import { LoaderComponent } from '../../../../../shared/components/common/loader/loader.component';
import { map, Observable, of, startWith } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { AddressViewComponent } from '../../../../../shared/components/profile/address-view/address-view.component';
import { FormInputErrorComponent } from '../../../../../shared/components/common/form/form-input-error/form-input-error.component';
import { ControlError } from '@app/core/services/utils/utils/utils.service';

type AddressStep = Address & { inline: string };
@Component({
  selector: 'app-checkout-delivery-step',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    LoaderComponent,
    AsyncPipe,
    AddressViewComponent,
    FormInputErrorComponent,
  ],
  templateUrl: './checkout-delivery-step.component.html',
  styleUrl: './checkout-delivery-step.component.css',
})
export class CheckoutDeliveryStepComponent implements OnInit {
  isLoading = signal(false);
  stepper = input.required<MatStepper>();
  orderDto = model.required<OrderDto>();
  addressService = inject(AddressService);
  addressFormControl = new FormControl<string | AddressStep>('');
  addresses = signal<AddressStep[]>([]);
  filteredAddresses: Observable<AddressStep[]> = of([]);
  showSelectedAddress = false;
  selectedAddress!: Address;

  hasInputError = signal<boolean>(false);
  errors = signal<ControlError[]>([]);

  ngOnInit(): void {
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
      this.filteredAddresses = of(this.addresses());
      this.filteredAddresses = this.addressFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => {
          let text = '';
          if (typeof value === 'string') {
            text = value;
          } else {
            text = value?.inline || '';
          }
          return this._filter(text);
        })
      );
    });
  }

  private _filter(name: string): AddressStep[] {
    const filterValue = name.toLowerCase();
    return this.addresses().filter((address) =>
      address.inline.toLowerCase().includes(filterValue)
    );
  }

  displayFn(value: AddressStep) {
    if (value) {
      return value.inline;
    }
    return '';
  }

  addressSelected() {
    this.showSelectedAddress = true;
    this.selectedAddress = <Address>(
      this.addresses().find(
        (address) => address === this.addressFormControl.value!
      )
    );
    this.orderDto.update((value) => {
      return { ...value, deliveryAddress: this.selectedAddress };
    });
  }

  back() {
    this.stepper().previous();
  }
  next() {
    this.hasInputError.set(false);
    this.errors.set([]);
    if (this.selectedAddress) {
      this.stepper().next();
    } else {
      this.hasInputError.set(true);
      const error: ControlError = {
        control: 'addressLine1',
        error: 'required',
        value: '',
      };
      this.errors.set([error]);
    }
  }
}
