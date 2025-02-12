import {
  Component,
  computed,
  effect,
  inject,
  Signal,
  signal,
} from '@angular/core';
import { ProductService } from '../../../core/services/http/product/product.service';
import { AbstractOnDestroy } from '../../../core/directives/unsubscriber/abstract.ondestroy';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FindByPageDto } from '../../../core/model/dto/product/findByPageDto';
import { Product } from '../../../core/model/db/product';
import { PriceRangeComponent } from '../../../shared/components/common/price-range/price-range.component';
import { SelectSortProductsComponent } from '../../../shared/components/product/select-sort-products/select-sort-products.component';
import { ProductListDetailsComponent } from '../../../shared/components/product/product-list-details/product-list-details.component';
import { PAGINATION_DEFAULT } from '../../../core/model/enum/paginationConst';
import { CategoryService } from '../../../core/services/http/category/category.service';
import { Category } from '../../../core/model/db/category';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatChip } from '@angular/material/chips';
import { SelectSortCategoryComponent } from '../../../shared/components/product/select-sort-category/select-sort-category.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-search-result',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatChip,
    PriceRangeComponent,
    SelectSortProductsComponent,
    SelectSortCategoryComponent,
    ProductListDetailsComponent,
    TranslateModule,
  ],
  templateUrl: './product-search-result.component.html',
  styles: ``,
})
export class ProductSearchResultComponent extends AbstractOnDestroy {
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);
  private readonly activatedRoute = inject(ActivatedRoute);
  readonly searchText = signal<string>('');
  readonly products = signal<Product[]>([]);

  readonly pageSizeOptions = [
    PAGINATION_DEFAULT.pageSize.valueOf(),
    PAGINATION_DEFAULT.pageSize.valueOf() * 2,
    PAGINATION_DEFAULT.pageSize.valueOf() * 3,
  ];
  productCount = computed(() => this.products().length);
  pageSize = signal<number>(PAGINATION_DEFAULT.pageSize);
  pageIndex = signal<number>(PAGINATION_DEFAULT.pageIndex);
  sortField = signal<string>(PAGINATION_DEFAULT.sortField);
  sortDirection = signal<string>(PAGINATION_DEFAULT.sortDirection);
  priceMin = signal<number>(PAGINATION_DEFAULT.priceMin);
  priceMax = signal<number>(PAGINATION_DEFAULT.priceMax);
  categoryId = signal<number>(PAGINATION_DEFAULT.categoryId);

  categories: Signal<Category[] | undefined> = toSignal(
    this.categoryService.findAll()
  );

  constructor() {
    super();

    effect((cleanUp) => {
      let subscription: Subscription;
      const findByPageDto: FindByPageDto = {
        page: this.pageIndex(),
        size: this.pageSize(),
        sortField: this.sortField(),
        sortDirection: this.sortDirection(),
        priceMin: this.priceMin(),
        priceMax: this.priceMax(),
        categoryId: this.categoryId(),
        searchText: this.searchText(),
      };

      subscription = this.productService
        .search(findByPageDto)
        .subscribe((products) => this.products.set(products));

      cleanUp(() => {
        subscription.unsubscribe();
      });
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.searchText.set(params['text']);
    });

    this.activatedRoute.params.subscribe((params) => {
      this.categoryId.set(params['id']);
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize.set(e.pageSize);
    this.pageIndex.set(e.pageIndex);
  }
}
