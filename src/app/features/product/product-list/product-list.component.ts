import {
  Component,
  effect,
  inject,
  model,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Product } from '@core/model/db/product';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService } from '@core/services/http/product/product.service';
import { CountAvailableDto } from '@core/model/dto/product/countAvailableDto';
import { FindByPageDto } from '@core/model/dto/product/findByPageDto';
import { CategoryService } from '@core/services/http/category/category.service';
import { Category } from '@core/model/db/category';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { PAGINATION_DEFAULT } from '@core/model/enum/paginationConst';
import { AbstractOnDestroy } from '@core/directives/unsubscriber/abstract.ondestroy';
import { PriceRangeComponent } from '@shared/components/common/price-range/price-range.component';
import { SelectSortProductsComponent } from '@shared/components/product/select-sort-products/select-sort-products.component';
import { SelectSortCategoryComponent } from '@shared/components/product/select-sort-category/select-sort-category.component';
import { ProductListDetailsComponent } from '@shared/components/product/product-list-details/product-list-details.component';
import { LoaderComponent } from '../../../shared/components/common/loader/loader.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    PriceRangeComponent,
    MatPaginatorModule,
    CommonModule,
    MatSelectModule,
    MatChipsModule,
    ReactiveFormsModule,
    TranslateModule,
    SelectSortProductsComponent,
    SelectSortCategoryComponent,
    ProductListDetailsComponent,
    LoaderComponent,
  ],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent extends AbstractOnDestroy implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);
  private readonly activatedRoute = inject(ActivatedRoute);
  readonly pageSizeOptions: number[] = [
    PAGINATION_DEFAULT.pageSize.valueOf(),
    PAGINATION_DEFAULT.pageSize.valueOf() * 2,
    PAGINATION_DEFAULT.pageSize.valueOf() * 3,
  ];

  productCount = signal<number>(0);
  pageSize = signal<number>(PAGINATION_DEFAULT.pageSize);
  pageIndex = signal<number>(PAGINATION_DEFAULT.pageIndex);
  sortField = signal<string>(PAGINATION_DEFAULT.sortField);
  sortDirection = signal<string>(PAGINATION_DEFAULT.sortDirection);
  priceMin = signal<number>(PAGINATION_DEFAULT.priceMin);
  priceMax = signal<number>(PAGINATION_DEFAULT.priceMax);
  products = signal<Product[]>([]);
  categoryIdParam = model<number>(PAGINATION_DEFAULT.categoryId);
  categoryId = signal<number>(PAGINATION_DEFAULT.categoryId);
  categories: Signal<Category[] | undefined> = toSignal(
    this.categoryService.findAll()
  );

  constructor() {
    super();
    effect((cleanUp) => {
      let countSubscription: Subscription;
      const countAvailableDto: CountAvailableDto = {
        priceMin: this.priceMin(),
        priceMax: this.priceMax(),
        categoryId: this.categoryId(),
      };

      countSubscription = this.productService
        .countAvailable(countAvailableDto)
        .subscribe((count) => this.productCount.set(count));

      let subscription: Subscription;
      let findByPageDto: FindByPageDto = {
        page: this.pageIndex(),
        size: this.pageSize(),
        sortField: this.sortField(),
        sortDirection: this.sortDirection(),
        priceMin: this.priceMin(),
        priceMax: this.priceMax(),
      };

      if (this.categoryId() === PAGINATION_DEFAULT.categoryId) {
        findByPageDto = {
          ...findByPageDto,
          categoryId: this.categoryId(),
        };
      }

      subscription = this.productService
        .findAllByPage(findByPageDto)
        .subscribe((products) => {
          this.products.set(products);
        });

      cleanUp(() => {
        subscription.unsubscribe();
        countSubscription.unsubscribe();
      });
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params) => {
        this.categoryId.set(params['id']);
      })
    );
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize.set(e.pageSize);
    this.pageIndex.set(e.pageIndex);
  }
}
