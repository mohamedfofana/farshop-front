import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [NgClass],
  template: `
    <i
      attr.data-star="{{ rate() }}"
      [ngClass]="{ 'fs-5 pb-1': size() === 'lg' }"
    ></i>
  `,
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent {
  rate = input.required<string>();
  size = input.required<string>();

}
