import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  input,
  ViewChild,
  viewChild,
} from '@angular/core';
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
export class FormInputErrorComponent implements AfterViewInit {
  errors = input.required<ControlError[]>();
  errorPrefix = input.required<string>();
  formError = viewChild.required<ElementRef<HTMLElement>>('formError');
  @ViewChild('formError')
  searchField!: ElementRef<HTMLElement>;

  constructor() {
    effect(() => {
      this.formError().nativeElement.focus();
    });
  }

  ngAfterViewInit(): void {
    this.formError().nativeElement.focus();
    this.searchField.nativeElement.focus();
  }
}
