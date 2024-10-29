import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

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
})
export class SigninComponent {
  private formBuilder = inject(FormBuilder);
  isSubmitted = signal(false);

  signinForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.signinForm.invalid) {
      this.isSubmitted.set(true);
      return;
    }
    console.log(this.signinForm.value);
  }
}
