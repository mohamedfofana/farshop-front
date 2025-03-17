import { CartProductDto } from './../../../../core/model/dto/product/cartProductDto';
import { Component, computed, inject, input, model } from '@angular/core';
import { Product } from '@app/core/model/db/product';
import { StorageService as StorageService } from '@core/services/storage/storage.service';

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
  product = input.required<Product>();
  disableDecrease = computed(() => this.quantity() === 0);

  decrease() {
    if (this.quantity() > 0) {
      this.quantity.update((value) => value - 1);
      const cartProductDto: CartProductDto = {
        id: this.product().id,
        quantity: this.quantity(),
      };
      this.storageService.removeProduct(cartProductDto);
    }
  }

  increase() {
    this.quantity.update((value) => value + 1);

    const cartProductDto = this.storageService.updateProductDetails(
      this.product(),
      {
        id: this.product().id,
        quantity: this.quantity(),
      }
    );
    this.storageService.addProduct(cartProductDto);
  }
}
