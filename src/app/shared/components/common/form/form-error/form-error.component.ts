import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './form-error.component.html',
  styles: ``,
})
export class FormErrorComponent {
  message = input.required<string>();
}
