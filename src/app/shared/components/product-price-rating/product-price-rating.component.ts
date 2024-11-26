import { Component, computed, input } from '@angular/core';
import { Product } from '../../../core/model/product';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { FinalProductpricePipe } from '../../../core/pipe/final-productprice.pipe';

@Component({
  selector: 'app-product-price-rating',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <div class="d-flex pt-1 pb-2">
      @if (product().discountPercentage === 0 ) {
      <div class="flex-fill">
        <span class="product_price fs-7 px-1">
          {{ product().price | currency : 'CAD' : 'symbol-narrow' : '1.2-2' }}
        </span>
      </div>

      } @else {
      <div class="flex-fill">
        <span class="product_price  px-1">
          {{ promotionPrice() | currency : 'CAD' : 'symbol-narrow' : '1.2-2' }}
        </span>
        <small class="product_old_price">{{
          product().price | currency : 'CAD' : 'symbol-narrow' : '1.2-2'
        }}</small>
      </div>
      }
    </div>
  `,
  styles: `.product_price {
    font-size: 16px;
    color: #fe4c50;
    font-weight: 600;
  }
  .product_old_price {
    font-size: 12px;
    margin-left: 5px;
    font-weight: 600;
    color: #b5aec4;
    text-decoration: line-through;
}`,
})
export class ProductPriceRatingComponent {
  product = input.required<Product>();
  promotionPrice = computed(() =>
    new FinalProductpricePipe().transform(this.product())
  );
  showRating = input<boolean>(false);
  discountPercentage = computed(() => this.product().discountPercentage / 100);
}
