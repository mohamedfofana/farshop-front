import { ProductSize } from '@core/model/db/productSize';
import { Component, inject, input, signal } from '@angular/core';
import { Product } from '@core/model/db/product';
import { StorageService } from '@core/services/storage/storage.service';
import { ProductPriceViewComponent } from '../../../product-price-rating/product-price-view.component';
import { ThemeButtonComponent } from '../../../../common/buttons/theme-button/theme-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { QuantityInputCustomComponent } from '../../../quantity-input-custom/quantity-input-custom.component';
import { ProductColor } from '@core/model/db/productColor';

@Component({
  selector: 'app-product-details-action',
  standalone: true,
  imports: [
    ProductPriceViewComponent,
    ThemeButtonComponent,
    TranslateModule,
    QuantityInputCustomComponent,
  ],
  templateUrl: './product-details-action.component.html',
  styleUrl: './product-details-action.component.scss',
})
export class ProductDetailsActionComponent {
  storageService = inject(StorageService);
  product = input.required<Product>();
  selectedColor = input<ProductColor>();
  selectedSize = input<ProductSize>();
  quantity = signal(1);

  ngOnInit() {
    const storedQuantity = this.storageService.getProductQuantity(
      this.product().id
    );
    this.quantity.set(storedQuantity);
  }

  addToCart() {
    const cartProductDto = this.storageService.updateDetails(this.product(), {
      id: this.product().id,
      quantity: this.quantity(),
      selectedColor: this.selectedColor(),
      selectedSize: this.selectedSize(),
    });
    this.storageService.addProduct(cartProductDto);

  }
}
