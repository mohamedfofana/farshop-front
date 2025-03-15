import {
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatStepper } from '@angular/material/stepper';
import { OrderDto } from '@app/core/model/dto/order/orderDto';
import { LoaderComponent } from '@shared/components/common/loader/loader.component';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import {
  injectStripe,
  StripeElementsDirective,
  StripePaymentElementComponent,
} from 'ngx-stripe';
import {
  StripeElementLocale,
  StripeElementsOptions,
  StripePaymentElementOptions,
} from '@stripe/stripe-js';
import { MatInputModule } from '@angular/material/input';
import { PaymentService } from '@app/core/services/http/payment/payment.service';
import { environment } from '@env/environment';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '@app/core/services/translationService/translation.service';
import { AbstractOnDestroy } from '@app/core/directives/unsubscriber/abstract.ondestroy';
import { StorageService } from '@app/core/services/storage/storage.service';
import { ProductService } from '@app/core/services/http/product/product.service';
import { ProductPricesPipe } from '@app/core/pipe/product-prices.pipe';
import { forkJoin, map } from 'rxjs';
import { FormInputErrorComponent } from '../../../../../shared/components/common/form/form-input-error/form-input-error.component';
import { ControlError } from '@app/core/services/utils/utils/utils.service';
import { AddressPreviewComponent } from '../../../../../shared/components/checkout/address-preview/address-preview.component';
import { MatCardModule } from '@angular/material/card';
import { OrderProductDto } from '@app/core/model/dto/orderproduct/orderProductDto';
import { PaymentDto } from '@app/core/model/dto/payment/paymentDto';
import { FormErrorComponent } from '../../../../../shared/components/common/form/form-error/form-error.component';
import { OrderService } from '@app/core/services/http/order/order.service';
import { SaveOrderDto } from '@app/core/model/dto/order/saveOrderDto';
import { NotifierService } from '@app/core/services/utils/notifier/notifier.service';
import { Router } from '@angular/router';
import { ROUTE_PATH } from '@app/core/config/routes/routesConfig';

@Component({
  selector: 'app-checkout-payment-step',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    TranslateModule,
    LoaderComponent,
    StripeElementsDirective,
    StripePaymentElementComponent,
    FormInputErrorComponent,
    AddressPreviewComponent,
    FormErrorComponent,
  ],
  templateUrl: './checkout-payment-step.component.html',
})
export class CheckoutPaymentStepComponent
  extends AbstractOnDestroy
  implements OnInit
{
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  private readonly fb = inject(UntypedFormBuilder);
  private readonly paymentService = inject(PaymentService);
  private readonly orderService = inject(OrderService);
  private readonly storageService = inject(StorageService);
  private readonly productService = inject(ProductService);
  private readonly notifierService = inject(NotifierService);
  private readonly translationService = inject(TranslationService);
  private readonly translate = inject(TranslateService);
  private readonly router = inject(Router);

  paymentElementForm = this.fb.group({});
  elementsOptions: StripeElementsOptions = {
    locale: this.translationService.getCurrentLanguage() as StripeElementLocale,
    appearance: {
      theme: 'stripe',
    },
  };
  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
    },
  };
  stripe = injectStripe(environment.stripe.PUBLIC_KEY);
  paying = signal(false);

  cartProducts = computed(() => this.storageService.cartProducts());
  totalAmountToPay = signal(0);
  shippingAmount = signal(5);
  firstRun: boolean;
  isLoading = signal(false);
  stepper = input.required<MatStepper>();
  orderDto = model.required<OrderDto>();
  hasInputError = signal<boolean>(false);
  hasPaymentError = signal<boolean>(false);
  errors = signal<ControlError[]>([]);

  constructor() {
    super();
    this.firstRun = true;
    effect(
      () => {
        if (!this.firstRun) {
          this.setPaymentIntent();
        } else {
          // to trigger effect change if
          this.cartProducts();
        }
        this.firstRun = false;
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit() {
    this.setPaymentIntent();
  }

  private createPaymentIntent(amount: number) {
    this.paymentService
      .createPaymentIntent(this.getCurrentOrder(amount))
      .subscribe((pi) => {
        this.elementsOptions.clientSecret = pi.clientSecret as string;
      });
  }

  getCurrentOrder(amount: number): PaymentDto {
    let orderProducts: OrderProductDto[] = [];

    orderProducts = this.cartProducts().flatMap<OrderProductDto>((p) => [
      { idProduct: p.id, quantity: p.quantity },
    ]);
    const paymentDto: PaymentDto = {
      amount: amount,
      currency: 'cad',
      orderProducts: orderProducts,
    };

    this.orderDto.update((value) => {
      return {
        ...value,
        amount: paymentDto.amount,
        currency: paymentDto.currency,
        orderProducts: paymentDto.orderProducts,
      };
    });

    return paymentDto;
  }
  setPaymentIntent() {
    this.totalAmountToPay.set(0);
    if (this.cartProducts()) {
      const productObservables = this.cartProducts().map((cartProduct) =>
        this.productService.findById(cartProduct.id).pipe(
          map((product) => {
            const productPrices = new ProductPricesPipe().transform(product);
            return productPrices.finalPrice * cartProduct.quantity;
          })
        )
      );

      const totalPrice$ = forkJoin(productObservables).pipe(
        map((prices) => prices.reduce((sum, price) => sum + price, 0))
      );

      const subTotal = totalPrice$.subscribe((total) => {
        this.createPaymentIntent(total - this.shippingAmount());
      });

      this.subscriptions.push(subTotal);
    }
  }

  back() {
    this.stepper().previous();
  }

  pay() {
    this.hasPaymentError.set(false);
    if (this.paying() || this.checkoutDataInvalid()) {
      return;
    }

    this.paying.set(true);
    const name = this.orderDto().firstname!.concat(this.orderDto().lastname!);
    const email = this.orderDto().email;
    const address = this.orderDto().billingAddress!.addressLine1;
    const postalCode = this.orderDto().billingAddress!.postalCode;
    const city = this.orderDto().billingAddress!.city;

    this.stripe
      .confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          shipping: {
            name: this.orderDto().deliveryAddress!.name,
            phone: this.orderDto().phonenumber,
            address: {
              line1: this.orderDto().deliveryAddress!.addressLine1,
              postal_code: this.orderDto().deliveryAddress!.postalCode,
              city: this.orderDto().deliveryAddress!.city,
            },
          },
          payment_method_data: {
            billing_details: {
              name: name,
              email: email,
              address: {
                line1: address,
                postal_code: postalCode,
                city: city,
              },
            },
          },
        },
        redirect: 'if_required',
      })
      .subscribe((result) => {
        this.paying.set(false);
        if (result.error) {
          this.hasPaymentError.set(true);
          console.error(result.error.message);
          throw new Error(result.error.message);
        } else {
          this.saveOrder(result.paymentIntent.id);
        }
      });
  }

  saveOrder(stripePaymentId: string) {
    const saveOrderDto: SaveOrderDto = {
      stripePaymentId: stripePaymentId,
      phonenumber: this.orderDto().phonenumber,
      deliveryAddressId: this.orderDto().deliveryAddress!.id,
      billingAddressId: this.orderDto().billingAddress!.id,
      amount: this.orderDto().amount!,
      currency: this.orderDto().currency!,
      orderProducts: this.orderDto().orderProducts!,
    };
    let successMessage: string;
    const subSuccessMessage$ = this.translate
      .get('checkout.step.payment.success')
      .subscribe((successMsg: string) => {
        successMessage = successMsg;
      });

    const saveSub = this.orderService.save(saveOrderDto).subscribe(() => {
      this.storageService.clearCart();
      this.notifierService.success(successMessage);
      this.router.navigateByUrl(ROUTE_PATH.PROFILE);
    });
    this.subscriptions.push(saveSub);
    this.subscriptions.push(subSuccessMessage$);
  }

  checkoutDataInvalid(): boolean {
    this.hasInputError.set(false);
    this.errors.set([]);
    if (!this.orderDto().deliveryAddress) {
      const error: ControlError = {
        control: 'delivery',
        error: 'required',
        value: '',
      };
      this.errors.update((value) => [...value, error]);
    }
    if (!this.orderDto().billingAddress) {
      const error: ControlError = {
        control: 'billing',
        error: 'required',
        value: '',
      };
      this.errors.update((value) => [...value, error]);
    }
    if (
      !this.orderDto().firstname ||
      !this.orderDto().lastname ||
      !this.orderDto().email
    ) {
      const error: ControlError = {
        control: 'informations',
        error: 'required',
        value: '',
      };
      this.errors.update((value) => [...value, error]);
    }
    if (this.errors().length > 0) {
      this.hasInputError.set(true);
    }

    return this.hasInputError();
  }
}
