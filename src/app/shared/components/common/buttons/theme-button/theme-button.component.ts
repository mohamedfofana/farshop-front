import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-theme-button',
  standalone: true,
  template: `
    <div class="text-left text-sm-right">
      <button
        type="button"
        class="custom_button theme-button trans_300 w-100 {{ buttonColor() }}"
        value="Submit"
        (click)="onClick()"
      >
        {{ title() }}
      </button>
    </div>
  `,
  styles: `
  .theme-button {
  border: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
}`,
})
export class ThemeButtonComponent {
  title = input.required<string>();
  buttonColor = input<string>('theme_bg_color');
  click = output();

  onClick(){
    this.click.emit();
  }
}
