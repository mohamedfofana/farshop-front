import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../core/services/http/product.service';
import { Product } from '../../../core/model/product';
import { UtilsService } from '../../../core/services/utils/utils.service';
import { EMPTY, of, switchMap } from 'rxjs';
import { NgIf } from '@angular/common';
import { ProductMoreInformationComponent } from '../../../shared/components/product/details/tabs/product-tab-more-information/product-tab-more-information.component';
import { ProductDescriptionComponent } from '../../../shared/components/product/details/tabs/product-tab-description/product-tab-description.component';
import { ProductDetailsImagesComponent } from '../../../shared/components/product/details/product-details-images/product-details-images.component';
import { ProductDetailsInfoComponent } from '../../../shared/components/product/details/product-details-info/product-details-info.component';
import { ProductDetailsBenefitComponent } from '../../../shared/components/product/details/product-details-benefit/product-details-benefit.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductTabReviewsComponent } from '../../../shared/components/product/details/tabs/product-tab-reviews/product-tab-reviews.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    MatTabsModule,
    NgIf,
    ProductTabReviewsComponent,
    ProductMoreInformationComponent,
    ProductDescriptionComponent,
    ProductDetailsImagesComponent,
    ProductDetailsInfoComponent,
    ProductDetailsBenefitComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent {
  activatedRoute = inject(ActivatedRoute);
  utilsService = inject(UtilsService);
  private productService = inject(ProductService);
  id$ = of(this.activatedRoute.snapshot.paramMap.get('id') || '');
  //id: Signal<string | undefined> = toSignal(this.id$);

  product: Signal<Product | undefined> = toSignal(
    this.id$.pipe(
      switchMap((currentId) => {
        if (currentId && this.utilsService.isInteger(currentId)) {
          return this.productService.getProduct(parseInt(currentId));
        }
        return EMPTY;
      })
    )
  );
}
