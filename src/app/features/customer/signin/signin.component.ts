import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationService } from '../../../core/services/authenticationService/authentication.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    RouterLink,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  private authenticationService = inject(AuthenticationService);

  login(): void {
    this.authenticationService.login();
  }

  signup(): void {
    this.authenticationService.signup();
  }
}
