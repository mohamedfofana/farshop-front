import { Component, input, output } from '@angular/core';
import { AddressViewComponent } from '@shared/components/profile/address-view/address-view.component';
import { Address } from '@core/model/db/address';

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [AddressViewComponent],
  templateUrl: './address-list.component.html',
})
export class AddressListComponent {
  addresses = input.required<Address[]>();
  reloadData = output<void>();
}
