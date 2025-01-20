import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-input-error',
  standalone: true,
  imports: [],
  template: `
    <span class="error ps-1"
      ><small>{{ inputError() }}</small></span
    >
  `,
  styles: ``,
})
export class FormInputErrorComponent {
  inputError = input.required<string>();
}
