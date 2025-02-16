import {
  Component,
  inject,
  computed,
  OnInit,
  signal,
  effect,
} from '@angular/core';
import { StorageService } from '@core/services/storage/storage.service';
import { ProductService } from '@core/services/http/product/product.service';
import { ProductPricesPipe } from '@core/pipe/product-prices.pipe';
import { AbstractOnDestroy } from '@core/directives/unsubscriber/abstract.ondestroy';
import { CurrencyPipe } from '@angular/common';
import { ThemeButtonComponent } from '../../../common/buttons/theme-button/theme-button.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CurrencyPipe, ThemeButtonComponent, TranslateModule],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.scss',
})
export class CartSummaryComponent extends AbstractOnDestroy implements OnInit {
  storageService = inject(StorageService);
  productService = inject(ProductService);
  cartProducts = computed(() => this.storageService.cartProducts());
  totalAmountToPay = signal(0);
  totalSaved = signal(0);
  shippingAmount = signal(5);
  totalAmount = computed(() => this.totalAmountToPay() + this.shippingAmount());
  firstRun: boolean;
  constructor() {
    super();
    this.firstRun = true;
    effect(
      () => {
        if (!this.firstRun) {
          this.refreshSummary();
        } else {
          // to trigger effect change if
          this.cartProducts();
        }
        this.firstRun = false;
      },
      { allowSignalWrites: true }
    );
  }
  ngOnInit(): void {
    this.refreshSummary();
  }

  refreshSummary() {
    this.totalAmountToPay.set(0);
    this.totalSaved.set(0);
    if (this.cartProducts()) {
      this.cartProducts().map((cartProduct) => {
        const sub = this.productService
          .findById(cartProduct.id)
          .subscribe((p) => {
            const productPrices = new ProductPricesPipe().transform(p);
            this.totalAmountToPay.update(
              (value) => value + productPrices.finalPrice * cartProduct.quantity
            );
            this.totalSaved.update(
              (value) => value + productPrices.savedPrice * cartProduct.quantity
            );
          });

        this.subscriptions.push(sub);
      });
    }
  }
}
