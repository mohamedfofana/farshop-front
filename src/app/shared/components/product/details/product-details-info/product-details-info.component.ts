import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ProductColorSelectComponent } from '../../product-color-select/product-color-select.component';
import { Product } from '../../../../../core/model/db/product';
import { StorageService } from '../../../../../core/services/storage/storage.service';
import { ProductSizeSelectComponent } from '../../product-size-select/product-size-select.component';
import { ProductPriceViewComponent } from '../../product-price-rating/product-price-view.component';
import { StarRatingReviewComponent } from '../../star-rating-review/star-rating-review.component';
import { ProductDetailComponent } from '../../product-detail/product-detail.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details-info',
  standalone: true,
  imports: [
    StarRatingReviewComponent,
    ProductColorSelectComponent,
    ProductSizeSelectComponent,
    ProductDetailComponent,
    ProductPriceViewComponent,
    TranslateModule,
  ],
  templateUrl: './product-details-info.component.html',
  styleUrl: './product-details-info.component.scss',
})
export class ProductDetailsInfoComponent implements OnInit {
  storageService = inject(StorageService);
  product = input.required<Product>();
  quantity = signal(1);

  ngOnInit() {
    const storedQuantity = this.storageService.getProductQuantity(
      this.product().id
    );
    this.quantity.set(storedQuantity);
  }
}
