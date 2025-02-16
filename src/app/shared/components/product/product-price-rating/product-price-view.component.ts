import { Component, computed, input } from '@angular/core';
import { CurrencyPipe, NgClass, NgIf } from '@angular/common';
import { Product } from '@core/model/db/product';
import { ProductPricesPipe } from '@core/pipe/product-prices.pipe';

@Component({
  selector: 'app-product-price-view',
  standalone: true,
  imports: [CurrencyPipe, NgClass, NgIf],
  templateUrl: `./product-price-view.component.html`,
  styleUrl: `./product-price-view.component.scss`,
})
export class ProductPriceViewComponent {
  product = input.required<Product>();
  size = input<'sm' | 'lg'>('sm');
  productPrices = computed(() =>
    new ProductPricesPipe().transform(this.product())
  );
  showRating = input<boolean>(false);
  showFinalPrice = input<boolean>(false);
}
