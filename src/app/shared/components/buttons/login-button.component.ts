import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authenticationService/authentication.service';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [],
  template: `
    <a
      href="javascript:void(0)"
      (click)="login()"
      class="d-block text-decoration-none text-dark"
    >
      <i class="bi bi-person h4"></i>
    </a>
  `,
})
export class LoginButtonComponent {
  private authenticationService = inject(AuthenticationService);

  login(): void {
    this.authenticationService.login();
  }
}
