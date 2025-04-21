import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '@core/services/http/customer/customer.service';
import { ProfileTabsComponent } from './profile-tabs/profile-tabs.component';
import { LoaderComponent } from '@shared/components/common/loader/loader.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ProfileTabsComponent, LoaderComponent],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private readonly customerService = inject(CustomerService);

  customer$ = this.customerService.findProfile();
}
