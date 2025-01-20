import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../../../core/model/db/product';
import { StorageService } from '../../../../core/services/storage/storage.service';
import { ProductPriceViewComponent } from '../product-price-rating/product-price-view.component';
import { ProductQuantityInputComponent } from '../product-quantity-input/product-quantity-input.component';
import { ThemeButtonComponent } from '../../common/buttons/theme-button/theme-button.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details-action',
  standalone: true,
  imports: [
    ProductPriceViewComponent,
    ProductQuantityInputComponent,
    ThemeButtonComponent,
    TranslateModule,
  ],
  templateUrl: './product-details-action.component.html',
  styleUrl: './product-details-action.component.scss',
})
export class ProductDetailsActionComponent {
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
