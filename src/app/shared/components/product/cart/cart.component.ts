import {
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CartProductComponent } from './cart-product/cart-product.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { StorageService } from '@core/services/storage/storage.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartProductComponent, CartSummaryComponent, TranslateModule, NgClass],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  mode = input<'checkout' | 'cart'>('cart');
  openCart = output();
  storageService = inject(StorageService);
  cartProducts = signal(this.storageService.getCartProductList());
  cartProductCount = computed(() => this.storageService.cartProductCount());
  constructor(private cd: ChangeDetectorRef) {}

  refreshCart() {
    this.cartProducts.set(this.storageService.getCartProductList());
  }

  closeCart() {
    this.openCart.emit();
  }
}
