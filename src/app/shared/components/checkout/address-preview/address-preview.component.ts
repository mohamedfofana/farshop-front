import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MatIconModule } from '@angular/material/icon';
import { Address } from '@core/model/db/address';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-address-preview',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, NgIf],
  templateUrl: './address-preview.component.html',
})
export class AddressPreviewComponent {
  address = input.required<Address>();
  badgeTitle = input<string>();
}
