import {
  Component,
  computed,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../../core/model/product';
import { LocalStorageService } from '../../../core/services/localStorageService/local-storage.service';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { EmptyImageComponent } from '../empty-image/empty-image.component';
import { QuantityPreviewInputComponent } from '../quantity-preview-input/quantity-preview-input.component';
import { ProductPriceRatingComponent } from '../product-price-rating/product-price-rating.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-preview',
  standalone: true,
  imports: [
    StarRatingComponent,
    EmptyImageComponent,
    QuantityPreviewInputComponent,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    EmptyImageComponent,
    ProductPriceRatingComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './product-preview.component.html',
  styleUrl: './product-preview.component.scss',
})
export class ProductPreviewComponent {
  product = input.required<Product>();
  storageService = inject(LocalStorageService);
  router = inject(Router);
  discountPercentage = computed(() => this.product().discountPercentage / 100);
  quantity = signal(0);
  selectSortByFieldFormControl = new FormControl<String>('');
  fieldList = ['Price', 'Rate', 'Name'];
  sortByField = signal('');
  showAddToCartButton: boolean = false;

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

  //   thumbnail = computed(() =>
  // //    this.product().imageUrls.find((image) => image.type === ImageUrlTypeEnum.THUMBNAIL)
  //   );

  //   rate = computed(() => {
  //     const reviews = this.product()?.reviews;
  //     if (reviews)
  //       return (
  //         reviews.reduce((total, b) => {
  //           return (total += b.rate);
  //         }, 0) / reviews.length
  //       );
  //     else return 0;
  //   });
  //   quantity = signal(0);
  //   initialQuantity = computed(() => {
  //     if (this.product()) {
  //       return this.storageService.cartProductIdList().filter((id) => id === this.product()?.id)
  //         .length;
  //     }
  //     return 0;
  //   }, {});

  //   constructor() {
  //     effect(
  //       () => {
  //         if (this.product()) {
  //           this.quantity.set(
  //             this.storageService.cartProductIdList().filter((id) => id === this.product()?.id).length
  //           );
  //         }
  //         this.quantity.set(this.initialQuantity());
  //       },
  //       { allowSignalWrites: true }
  //     );

  //     effect(
  //       () => {
  //         if (this.quantity() >= 0) {
  //           this.addToCart();
  //         }
  //       },
  //       { allowSignalWrites: true }
  //     );
  //   }

  //   addToCart() {
  //     this.storageService.addToCart(this.product().id, this.quantity());
  //   }

  addInitialToCart() {
    this.quantity.set(1);
  }

  showDetail(id: number) {
    //this.router.navigateByUrl(ROUTE_PATH.PRODUCT_DETAIL + '/' + id);
  }
}
