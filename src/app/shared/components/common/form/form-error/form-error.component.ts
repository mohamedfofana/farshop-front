import { Component, effect, ElementRef, viewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './form-error.component.html',
  styles: ``,
})
export class FormErrorComponent {
  formError = viewChild.required<ElementRef<HTMLInputElement>>('formError');

  constructor() {
    effect(() => {
      this.formError().nativeElement.focus();
    });
  }
}
