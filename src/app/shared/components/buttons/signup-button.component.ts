import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authenticationService/authentication.service';

@Component({
  selector: 'app-signup-button',
  standalone: true,
  imports: [],
  template: `
    <a
      href="javascript:void(0)"
      (click)="signup()"
      class="d-block text-decoration-none text-dark"
    >
      <i class="bi bi-person-fill-add h4"></i>
    </a>
  `,
})
export class SignupButtonComponent {
  private authenticationService = inject(AuthenticationService);

  signup(): void {
    this.authenticationService.signup();
  }
}
