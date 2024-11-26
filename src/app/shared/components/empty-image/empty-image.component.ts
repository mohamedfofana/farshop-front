import { Component } from '@angular/core';

@Component({
  selector: 'app-empty-image',
  standalone: true,
  imports: [],
  template: ` <div class="text-center">
    <svg
      class="img-fluid"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
      role="img"
      aria-label="Placeholder: 200x200"
    >
      <title>Placeholder</title>
      <rect width="100%" height="100%" fill="#ffffff"></rect>
      <text x="30%" y="50%" fill="#000000">No image</text>
    </svg>
  </div>`,
})
export class EmptyImageComponent {}
