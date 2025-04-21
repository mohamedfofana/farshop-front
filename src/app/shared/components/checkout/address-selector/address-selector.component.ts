import { Component, input, model, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Address } from '@app/core/model/db/address';
import { AddressStep } from '@app/core/model/types/addressStep';
import { map, Observable, of, startWith } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { AddressPreviewComponent } from '../address-preview/address-preview.component';

@Component({
  selector: 'app-address-selector',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    AsyncPipe,
    AddressPreviewComponent,
  ],
  templateUrl: './address-selector.component.html',
})
export class AddressSelectorComponent implements OnInit {
  title = input.required<string>();
  addresses = input.required<AddressStep[]>();
  selectedAddress = model.required<Address>();
  addressFormControl = new FormControl<string | AddressStep>('');
  filteredAddresses: Observable<AddressStep[]> = of([]);
  showSelectedAddress = false;

  ngOnInit(): void {
    const list: AddressStep[] = [];
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
    this.selectedAddress.set(
      <Address>(
        this.addresses().find(
          (address) => address === this.addressFormControl.value!
        )
      )
    );
  }
}
