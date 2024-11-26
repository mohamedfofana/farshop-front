import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authenticationService/authentication.service';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [],
  template: `
    <a class="dropdown-item" href="javascript:void(0)" (click)="logout()">
      <i class="bi bi-box-arrow-left h4" bl></i
    ></a>
  `,
})
export class LogoutButtonComponent {
  private authenticationService = inject(AuthenticationService);

  logout(): void {
    this.authenticationService.logout();
  }
}
