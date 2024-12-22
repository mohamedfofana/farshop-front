import {
  Component,
  computed,
  HostListener,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductPriceViewComponent } from '../product-price-rating/product-price-view.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StarRatingComponent } from '../../star-rating/star-rating.component';
import { EmptyImageComponent } from '../../empty-image/empty-image.component';
import { Product } from '../../../../core/model/product';
import { ROUTE_PATH } from '../../../../core/config/routes/routesConfig';
import { QuantityInputComponent } from '../quantity-input/quantity-input.component';
import { StorageService } from '../../../../core/services/storage/storage.service';

@Component({
  selector: 'app-product-preview',
  standalone: true,
  imports: [
    StarRatingComponent,
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
export class ProductPreviewComponent implements OnInit {
  router = inject(Router);
  storageService = inject(StorageService);
  quantity = signal<number>(0);
  product = input.required<Product>();
  discountPercentage = computed(() => this.product().discountPercentage / 100);
  selectSortByFieldFormControl = new FormControl<String>('');
  fieldList = ['Price', 'Rate', 'Name'];
  sortByField = signal('');
  showAddToCartButton: boolean = false;

  ngOnInit() {
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
    this.storageService.addSingleProduct(this.product().id);
  }

  showDetail(id: number) {
    const url = ROUTE_PATH.PRODUCT_DETAIL.replace(':id', id.toString());
    this.router.navigateByUrl(url);
  }
}
