import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';
import { CustomerService } from '../../../core/services/http/customer/customer.service';
import { ProfileTabsComponent } from './profile-tabs/profile-tabs.component';
import { LoaderComponent } from "../../../shared/components/common/loader/loader.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ProfileTabsComponent, LoaderComponent],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private readonly auth0Service = inject(AuthService);
  private readonly customerService = inject(CustomerService);

  customer$ = this.auth0Service.user$.pipe(
    switchMap((user) => this.customerService.findByEmail(user?.email!)),
  );
}
