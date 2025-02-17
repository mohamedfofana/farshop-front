import { Component, computed, input, model } from '@angular/core';

@Component({
  selector: 'app-quantity-input-custom',
  standalone: true,
  imports: [],
  template: `
    <div class="quantity_selector rounded-5 p-2">
      <span class="minus"
        ><i class="bi bi-dash-lg" aria-hidden="true" (click)="decrease()"></i
      ></span>
      <span id="quantity_value">{{ quantity() }}</span>
      <span class="plus"
        ><i class="bi bi-plus-lg" aria-hidden="true" (click)="increase()"></i
      ></span>
    </div>
  `,
  styleUrl: './quantity-input-custom.component.scss',
})
export class QuantityInputCustomComponent {
  quantity = model.required<number>();
  min = input<number>(1);
  disableDecrease = computed(() => this.quantity() === 0);

  decrease() {
    if (this.quantity() > this.min()) {
      this.quantity.update((value) => value - 1);
    }
  }
  increase() {
    this.quantity.update((value) => value + 1);
  }
}
