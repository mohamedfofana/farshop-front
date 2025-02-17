import { Component, input, model } from '@angular/core';
import { QuantityInputComponent } from '../quantity-input/quantity-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { Product } from '@app/core/model/db/product';

@Component({
  selector: 'app-product-quantity-input',
  standalone: true,
  imports: [QuantityInputComponent, TranslateModule],
  template: `
    <div class="d-flex justify-content-start quantity">
      <span class="pb-2">{{
        'product.section.quantity.title' | translate
      }}</span>
    </div>
    <div class="">
      <app-quantity-input [product]="product()" [quantity]="quantity()" />
    </div>
  `,
  styleUrl: './product-quantity-input.component.scss',
})
export class ProductQuantityInputComponent {
  quantity = model.required<number>();
  product = input.required<Product>();
}
