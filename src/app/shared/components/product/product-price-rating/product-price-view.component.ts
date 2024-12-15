import { Component, computed, input } from '@angular/core';
import { CurrencyPipe, NgClass, NgIf } from '@angular/common';
import { Product } from '../../../../core/model/product';
import { FinalProductpricePipe } from '../../../../core/pipe/final-productprice.pipe';

@Component({
  selector: 'app-product-price-view',
  standalone: true,
  imports: [CurrencyPipe, NgClass, NgIf],
  template: `
    <div class="d-flex pt-1 pb-2">
      <div class="flex-fill">
        <span
          class="product_price px-1"
          [ngClass]="{ 'fs-6': size() === 'sm', 'fs-4': size() === 'lg' }"
        >
          {{ finalPrice() | currency : 'CAD' : 'symbol-narrow' : '1.2-2' }}
        </span>
        <small
          class="product_old_price"
          *ngIf="this.discountPercentage() !== 0"
          [ngClass]="{ 'fs-6': size() === 'lg' }"
          >{{
            product().price | currency : 'CAD' : 'symbol-narrow' : '1.2-2'
          }}</small
        >
      </div>
    </div>
  `,
  styles: `.product_price {
    color: #fe4c50;
    font-weight: 600;
  }
  .product_old_price {
    margin-left: 5px;
    font-weight: 600;
    color: #b5aec4;
    text-decoration: line-through;
}`,
})
export class ProductPriceViewComponent {
  product = input.required<Product>();
  size = input<'sm' | 'lg'>('sm');
  promotionPrice = computed(() =>
    new FinalProductpricePipe().transform(this.product())
  );
  showRating = input<boolean>(false);
  discountPercentage = computed(() => this.product().discountPercentage / 100);
  finalPrice = computed(() => {
    if (this.discountPercentage() !== 0) {
      return this.promotionPrice();
    }
    return this.product().price;
  });
}
