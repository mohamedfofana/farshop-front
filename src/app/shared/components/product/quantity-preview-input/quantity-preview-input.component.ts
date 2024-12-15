import { Component, computed, model } from '@angular/core';

@Component({
  selector: 'app-quantity-preview-input',
  standalone: true,
  imports: [],
  templateUrl: './quantity-preview-input.component.html',
  styleUrl: './quantity-preview-input.component.scss',
})
export class QuantityPreviewInputComponent {
  quantity = model.required<number>();
  disableDecrease = computed(() => this.quantity() === 0);

  decrease() {
    if (this.quantity() !== 0) {
      this.quantity.set(this.quantity() - 1);
    }
  }
  increase() {
    this.quantity.set(this.quantity() + 1);
  }
}
