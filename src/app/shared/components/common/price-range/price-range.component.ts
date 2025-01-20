import { Component, model } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-price-range',
  standalone: true,
  imports: [MatSliderModule],
  template: `
    <span class="fw-medium">Price {{ priceMin() }} $ - {{ priceMax() }} $</span>
    <mat-slider min="0" max="2000" step="1" showTickMarks discrete>
      <input [(value)]="priceMin" matSliderStartThumb />
      <input [(value)]="priceMax" matSliderEndThumb />
    </mat-slider>
  `,
  styles: `.mat-mdc-slider .mdc-slider__value-indicator::before {
    border-top-color: var(--accent-color) !important;
  }
  .mat-mdc-slider .mdc-slider__value-indicator {
    background-color: var(--accent-color) !important;
    opacity: 1 !important;
  }
  .mdc-slider .mdc-slider__value-indicator {
    transform: none !important;
  }`,
})
export class PriceRangeComponent {
  priceMin = model.required<number>();
  priceMax = model.required<number>();
}
