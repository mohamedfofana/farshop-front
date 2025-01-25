import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

type ControlError = {
  control: string;
  error: string;
  value: string;
};
@Component({
  selector: 'app-form-input-error',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './form-input-error.component.html',
  styles: ``,
})
export class FormInputErrorComponent {
  errors = input.required<ControlError[]>();
}
