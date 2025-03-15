import { computed, Directive, effect, inject, signal } from '@angular/core';
import { AbstractOnDestroy } from '../unsubscriber/abstract.ondestroy';
import { StorageService } from '@app/core/services/storage/storage.service';
import { ProductService } from '@app/core/services/http/product/product.service';
import { ProductPricesPipe } from '@app/core/pipe/product-prices.pipe';
@Directive()
export abstract class AbstractShoppingCartLiveAmounts extends AbstractOnDestroy {
  private readonly storageService = inject(StorageService);
  private readonly productService = inject(ProductService);
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
  // ngOnInit(): void {
  // perform in child class
  //   this.refreshSummary();
  // }

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
