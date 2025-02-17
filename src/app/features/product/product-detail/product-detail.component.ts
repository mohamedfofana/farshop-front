import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@core/services/http/product/product.service';
import { map, switchMap } from 'rxjs';
import { ProductDescriptionComponent } from '@shared/components/product/details/tabs/product-tab-description/product-tab-description.component';
import { ProductDetailsImagesComponent } from '@shared/components/product/details/detail/product-details-images/product-details-images.component';
import { ProductDetailsInfoComponent } from '@shared/components/product/details/detail/product-details-info/product-details-info.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductTabReviewsComponent } from '@shared/components/product/details/tabs/product-tab-reviews/product-tab-reviews.component';
import { ProductDetailsActionComponent } from '@shared/components/product/details/detail/product-details-action/product-details-action.component';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoaderComponent } from '@shared/components/common/loader/loader.component';
import { StorageService } from '@app/core/services/storage/storage.service';
import { ProductColor } from '@app/core/model/db/productColor';
import { ProductSize } from '@app/core/model/db/productSize';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    MatTabsModule,
    ProductTabReviewsComponent,
    ProductDescriptionComponent,
    ProductDetailsImagesComponent,
    ProductDetailsInfoComponent,
    ProductDetailsActionComponent,
    NgIf,
    AsyncPipe,
    TranslateModule,
    LoaderComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly storageService = inject(StorageService);
  reviewsCount = signal<number>(0);
  id$ = this.activatedRoute.params.pipe(map((params) => params['id']));
  product$ = this.id$.pipe(switchMap((id) => this.productService.findById(id)));

  selectedColor : ProductColor | undefined;
  selectedSize : ProductSize | undefined;
}
