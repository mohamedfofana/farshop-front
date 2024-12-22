import { Component, input, model } from '@angular/core';
import { QuantityInputComponent } from '../quantity-input/quantity-input.component';

@Component({
  selector: 'app-product-quantity-input',
  standalone: true,
  imports: [QuantityInputComponent],
  template: `
    <div
      class="quantity d-flex flex-row flex-grow lex-sm-row align-items-sm-center"
    >
      <span class="align-content-center">Quantity:</span>
      <app-quantity-input [idProduct]="idProduct()" [quantity]="quantity()" />
    </div>
  `,
  styleUrl: './product-quantity-input.component.scss',
})
export class ProductQuantityInputComponent {
  quantity = model.required<number>();
  idProduct = input.required<number>();
}
