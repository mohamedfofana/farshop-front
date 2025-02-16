import { Component, input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PersonalInfoComponent } from '../tabs/personal-info/personal-info.component';
import { Customer } from '@core/model/db/customer';
import { TranslateModule } from '@ngx-translate/core';
import { AddressesComponent } from '../tabs/addresses/addresses.component';

@Component({
  selector: 'app-profile-tabs',
  standalone: true,
  imports: [
    MatTabsModule,
    PersonalInfoComponent,
    TranslateModule,
    AddressesComponent,
  ],
  templateUrl: './profile-tabs.component.html',
  styleUrl: './profile-tabs.component.scss',
})
export class ProfileTabsComponent {
  customer = input.required<Customer>();
}
