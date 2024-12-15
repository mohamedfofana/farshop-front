import { Component, effect, inject, signal } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Product } from '../../../core/model/product';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService } from '../../../core/services/http/product.service';
import { PriceRangeComponent } from '../../../shared/components/price-range/price-range.component';
import { SelectSortProductsComponent } from '../../../shared/components/select-sort-products/select-sort-products.component';
import { CountAvailableDto } from '../../../core/model/dto/countAvailableDto';
import { FindByPageDto } from '../../../core/model/dto/findByPageDto';
import { ProductPreviewComponent } from '../../../shared/components/product/product-preview/product-preview.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  styleUrl: './product-list.component.scss',
  imports: [
    PriceRangeComponent,
    ProductPreviewComponent,
    MatPaginatorModule,
    CommonModule,
    MatSelectModule,
    MatChipsModule,
    ReactiveFormsModule,
    TranslateModule,
    SelectSortProductsComponent,
  ],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  private productService = inject(ProductService);
  readonly pageSizeOptions = [5, 10, 15];
  length = signal(0);
  pageSize = signal(5);
  pageIndex = signal(0);
  sortField = signal('createdAt');
  sortDirection = signal('desc');
  priceMin = signal(0);
  priceMax = signal(2000);
  products = signal<Product[]>([]);

  constructor() {
    effect((cleanUp) => {
      let countSubscription: Subscription;
      const countAvailableDto: CountAvailableDto = {
        priceMin: this.priceMin(),
        priceMax: this.priceMax(),
      };
      countSubscription = this.productService
        .countAvailable(countAvailableDto)
        .subscribe((count) => this.length.set(count));

      let subscription: Subscription;
      const findByPageDto: FindByPageDto = {
        page: this.pageIndex(),
        size: this.pageSize(),
        sortField: this.sortField(),
        sortDirection: this.sortDirection(),
        priceMin: this.priceMin(),
        priceMax: this.priceMax(),
      };

      subscription = this.productService
        .getProductsByPage(findByPageDto)
        .subscribe((products) => this.products.set(products));

      cleanUp(() => {
        subscription.unsubscribe();
        countSubscription.unsubscribe();
      });
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize.set(e.pageSize);
    this.pageIndex.set(e.pageIndex);
  }
}
