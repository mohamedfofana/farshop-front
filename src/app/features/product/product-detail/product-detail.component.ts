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
import { EMPTY, map, switchMap } from 'rxjs';
import { ProductDescriptionComponent } from '../../../shared/components/product/details/tabs/product-tab-description/product-tab-description.component';
import { ProductDetailsImagesComponent } from '../../../shared/components/product/details/product-details-images/product-details-images.component';
import { ProductDetailsInfoComponent } from '../../../shared/components/product/details/product-details-info/product-details-info.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductTabReviewsComponent } from '../../../shared/components/product/details/tabs/product-tab-reviews/product-tab-reviews.component';
import { ProductDetailsActionComponent } from '../../../shared/components/product/product-details-action/product-details-action.component';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataFoundComponent } from '../../no-data-found/no-data-found.component';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    MatTabsModule,
    ProductTabReviewsComponent,
    ProductDescriptionComponent,
    ProductDetailsImagesComponent,
    ProductDetailsInfoComponent,
    NoDataFoundComponent,
    ProductDetailsActionComponent,
    NgIf,
    AsyncPipe,
    TranslateModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  reviewsCount = signal<number>(0);
  id$ = this.activatedRoute.params.pipe(map((params) => params['id']));
  product$ = this.id$.pipe(switchMap((id) => this.productService.find(id)));

}
