import {
  Component,
  computed,
  effect,
  HostListener,
  inject,
  input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductPriceViewComponent } from '../product-price-rating/product-price-view.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EmptyImageComponent } from '../../common/empty-image/empty-image.component';
import { ROUTE_PATH } from '@core/config/routes/routesConfig';
import { QuantityInputComponent } from '../quantity-input/quantity-input.component';
import { StorageService } from '@core/services/storage/storage.service';
import { Product } from '@core/model/db/product';
import { StarRatingReviewComponent } from '../star-rating-review/star-rating-review.component';

@Component({
  selector: 'app-product-preview',
  standalone: true,
  imports: [
    StarRatingReviewComponent,
    EmptyImageComponent,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    EmptyImageComponent,
    ProductPriceViewComponent,
    ReactiveFormsModule,
    QuantityInputComponent,
  ],
  templateUrl: './product-preview.component.html',
  styleUrl: './product-preview.component.scss',
})
export class ProductPreviewComponent implements OnChanges {
  router = inject(Router);
  storageService = inject(StorageService);
  quantity = signal<number>(0);
  product = input.required<Product>();
  discountPercentage = computed(() => this.product().discountPercentage / 100);
  selectSortByFieldFormControl = new FormControl<String>('');
  fieldList = ['Price', 'Rate', 'Name'];
  sortByField = signal('');
  showAddToCartButton: boolean = false;
  cartProducts = computed(() => this.storageService.cartProducts());
  cartProductCount = computed(() => this.storageService.cartProductCount());

  constructor() {
    effect(
      () => {
        // reset quantity when cart is empty
        if (this.cartProductCount() === 0) {
          this.quantity.set(0);
          return;
        }

        if (this.product() && this.storageService.getCartProductCount()) {
          const cartProduct = this.cartProducts().find(
            (p) => p.id === this.product().id
          );

          if (!cartProduct) {
            // reset quantity product is not in cart no more
            this.quantity.set(0);
            return;
          }
          this.quantity.set(cartProduct!.quantity);
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initializeQuantity();
  }

  private initializeQuantity() {
    const storedQuantity = this.storageService.getProductQuantity(
      this.product().id
    );
    this.quantity.set(storedQuantity);
  }

  sortByColumnChanged() {
    if (this.selectSortByFieldFormControl.value) {
      this.sortByField.set(this.selectSortByFieldFormControl.value as string);
    }
  }

  onSortByColumnRemoved(field: string) {
    this.selectSortByFieldFormControl.setValue('');
  }

  @HostListener('mouseover')
  mouseover() {
    this.showAddToCartButton = true;
  }

  @HostListener('mouseleave')
  mouseleave() {
    this.showAddToCartButton = false;
  }

  initializeInCart() {
    this.quantity.set(1);

    const cartProductDto = this.storageService.updateProductDetails(
      this.product(),
      {
        id: this.product().id,
        quantity: 1,
      }
    );
    this.storageService.addProduct(cartProductDto);
  }

  showDetail(id: number) {
    const url = ROUTE_PATH.PRODUCT_DETAIL.replace(':id', id.toString());
    this.router.navigateByUrl(url);
  }
}
