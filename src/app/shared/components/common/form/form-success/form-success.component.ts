import { Component, ElementRef, input, OnInit, viewChild } from '@angular/core';

@Component({
  selector: 'app-form-success',
  standalone: true,
  imports: [],
  template: `
    <div class="alert alert-success" role="alert" #formSuccess>
      {{ message() }}
    </div>
  `,
  styles: `.alert-success{
    width: max-content;
  }`,
})
export class FormSuccessComponent implements OnInit {
  message = input.required<string>();
  formSuccess = viewChild.required<ElementRef<HTMLInputElement>>('formSuccess');

  ngOnInit(): void {
    this.formSuccess().nativeElement.focus();
  }
}
