import { Component, computed, inject, input, model } from '@angular/core';
import { StorageService as StorageService } from '../../../../core/services/storage/storage.service';

@Component({
  selector: 'app-quantity-input',
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
  styleUrl: './quantity-input.component.scss',
})
export class QuantityInputComponent {
  storageService = inject(StorageService);
  quantity = model.required<number>();
  idProduct = input.required<number>();
  disableDecrease = computed(() => this.quantity() === 0);

  decrease() {
    if (this.quantity() > 0) {
      this.quantity.set(this.quantity() - 1);
      this.storageService.removeSingleProduct(this.idProduct());
    }
  }
  increase() {
    this.quantity.set(this.quantity() + 1);
    this.storageService.addSingleProduct(this.idProduct());
  }
}
