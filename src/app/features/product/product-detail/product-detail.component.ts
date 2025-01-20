import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  Signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../core/services/http/product/product.service';
import { Product } from '../../../core/model/db/product';
import { UtilsService } from '../../../core/services/utils/utils/utils.service';
import { EMPTY, of, switchMap } from 'rxjs';
import { ProductDescriptionComponent } from '../../../shared/components/product/details/tabs/product-tab-description/product-tab-description.component';
import { ProductDetailsImagesComponent } from '../../../shared/components/product/details/product-details-images/product-details-images.component';
import { ProductDetailsInfoComponent } from '../../../shared/components/product/details/product-details-info/product-details-info.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductTabReviewsComponent } from '../../../shared/components/product/details/tabs/product-tab-reviews/product-tab-reviews.component';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';
import { ProductDetailsActionComponent } from '../../../shared/components/product/product-details-action/product-details-action.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    MatTabsModule,
    ProductTabReviewsComponent,
    ProductDescriptionComponent,
    ProductDetailsImagesComponent,
    ProductDetailsInfoComponent,
    PageNotFoundComponent,
    ProductDetailsActionComponent,
    TranslateModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent {
  activatedRoute = inject(ActivatedRoute);
  utilsService = inject(UtilsService);
  private productService = inject(ProductService);
  reviewsCount = signal<number>(0);
  id$ = of(this.activatedRoute.snapshot.paramMap.get('id') || '');

  product: Signal<Product | undefined> = toSignal(
    this.id$.pipe(
      switchMap((currentId) => {
        if (currentId && this.utilsService.isInteger(currentId)) {
          return this.productService.find(parseInt(currentId));
        }
        return EMPTY;
      })
    )
  );
}
