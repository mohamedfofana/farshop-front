import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../../../../core/model/product';
import { ProductPriceViewComponent } from '../../product-price-rating/product-price-view.component';
import { StarRatingComponent } from '../../../star-rating/star-rating.component';
import { ProductColorSelectComponent } from '../../product-color-select/product-color-select.component';
import { ProductQuantityInputComponent } from '../../product-quantity-input/product-quantity-input.component';
import { AbstractOnDestroy } from '../../../../../core/directives/unsubscriber/abstract.ondestroy';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-product-details-info',
  standalone: true,
  imports: [
    ProductPriceViewComponent,
    StarRatingComponent,
    ProductColorSelectComponent,
    ProductQuantityInputComponent,
  ],
  templateUrl: './product-details-info.component.html',
  styleUrl: './product-details-info.component.scss',
})
export class ProductDetailsInfoComponent extends AbstractOnDestroy {
  storageService = inject(LocalStorageService);
  product = input.required<Product>();
  quantity = signal(1);

  addToCart() {
    // TODO Add to cart
  }
}
