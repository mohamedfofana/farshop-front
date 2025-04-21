import { Component, inject, input, model, OnInit, signal } from '@angular/core';
import { Product } from '@core/model/db/product';
import { StorageService } from '@core/services/storage/storage.service';
import { ProductPriceViewComponent } from '../../../product-price-rating/product-price-view.component';
import { StarRatingReviewComponent } from '../../../star-rating-review/star-rating-review.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProductColorSelectComponent } from '../product-color-select/product-color-select.component';
import { ProductSizeSelectComponent } from '../product-size-select/product-size-select.component';
import { ProductCharacteristicsComponent } from '../product-characteristics/product-characteristics.component';
import { ProductColor } from '@app/core/model/db/productColor';
import { ProductSize } from '@app/core/model/db/productSize';

@Component({
  selector: 'app-product-details-info',
  standalone: true,
  imports: [
    StarRatingReviewComponent,
    ProductColorSelectComponent,
    ProductSizeSelectComponent,
    ProductPriceViewComponent,
    TranslateModule,
    ProductCharacteristicsComponent,
  ],
  templateUrl: './product-details-info.component.html',
  styleUrl: './product-details-info.component.scss',
})
export class ProductDetailsInfoComponent implements OnInit {
  storageService = inject(StorageService);
  product = input.required<Product>();
  selectedColor = model<ProductColor>();
  selectedSize = model<ProductSize>();
  quantity = signal(1);

  ngOnInit() {
    const storedQuantity = this.storageService.getProductQuantity(
      this.product().id
    );
    this.quantity.set(storedQuantity);
  }
}
