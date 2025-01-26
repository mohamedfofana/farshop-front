import { Component, input } from '@angular/core';

@Component({
  selector: 'app-mat-input-error',
  standalone: true,
  imports: [],
  template: ` <i class="bi bi-exclamation-circle-fill"></i> {{ inputError() }} `,
  styles: ``,
})
export class MatInputErrorComponent {
  inputError = input.required<string>();
}
