import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { CartProductDto } from '@core/model/dto/product/cartProductDto';
import { ProductService } from '@core/services/http/product/product.service';
import { Product } from '@core/model/db/product';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf, PercentPipe } from '@angular/common';
import { QuantityInputComponent } from '../../quantity-input/quantity-input.component';
import { ProductPriceViewComponent } from '../../product-price-rating/product-price-view.component';
import { LoaderComponent } from '../../../common/loader/loader.component';
import { StorageService } from '@core/services/storage/storage.service';
import { AbstractOnDestroy } from '@app/core/directives/unsubscriber/abstract.ondestroy';

@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    QuantityInputComponent,
    PercentPipe,
    ProductPriceViewComponent,
    LoaderComponent,
  ],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.scss',
})
export class CartProductComponent extends AbstractOnDestroy implements OnInit {
  cartProduct = input.required<CartProductDto>();
  refreshCart = output();
  productService = inject(ProductService);
  storageService = inject(StorageService);
  product$!: Observable<Product | undefined>;
  quantity = signal<number>(1);
  hide = false;

  constructor() {
    super();
    effect(() => {
      if (this.quantity() === 0) {
        this.hide = true;
      }
    });
  }
  ngOnInit(): void {
    this.product$ = this.productService.findById(this.cartProduct().id);
    this.quantity.set(this.cartProduct().quantity);
  }

  removeFromCart() {
    const cartProductDto: CartProductDto = {
      id: this.cartProduct().id,
      quantity: this.quantity(),
    };
    this.storageService.removeProduct(cartProductDto);
    this.hide = true;
  }
}
