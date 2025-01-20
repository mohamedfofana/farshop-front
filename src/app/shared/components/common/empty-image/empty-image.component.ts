import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-empty-image',
  standalone: true,
  imports: [TranslateModule],
  template: ` <div class="text-center">
    <svg
      class="img-fluid"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
      role="img"
      aria-label="Placeholder: 200x200"
    >
      <title>{{ 'product.section.image-preview.title' | translate }}</title>
      <rect width="100%" height="100%" fill="#ffffff"></rect>
      <text x="30%" y="50%" fill="#000000">
        {{ 'product.section.image-preview.content' | translate }}
      </text>
    </svg>
  </div>`,
})
export class EmptyImageComponent {}
