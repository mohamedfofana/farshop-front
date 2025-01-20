import { Component, input } from '@angular/core';

@Component({
  selector: 'app-theme-button',
  standalone: true,
  template: `
    <div class="text-left text-sm-right">
      <button
        type="button"
        class="custom_button theme-button trans_300 w-100 {{ buttonColor() }}"
        value="Submit"
      >
        {{ title() }}
      </button>
    </div>
  `,
  styles: `
  .theme-button {
  border: none;
  color: #0f1111;
  font-size: 14px;
  font-weight: 300;
  cursor: pointer;
}`,
})
export class ThemeButtonComponent {
  title = input<string>('Submit');
  buttonColor = input<string>('theme_bg_color');
}
