import { Component, inject, input, model } from '@angular/core';
import { StorageService } from '@app/core/services/storage/storage.service';
import { ProductSize } from '@core/model/db/productSize';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-size-select',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './product-size-select.component.html',
  styleUrl: './product-size-select.component.scss',
})
export class ProductSizeSelectComponent {
  storageService = inject(StorageService);
  productId = input.required<number>();
  sizes = input.required<ProductSize[]>();
  selectedSize = model<ProductSize>();

  ngOnInit(): void {
    let currentSize = this.storageService.findCurrentSize(this.productId());
    if (!currentSize) {
      currentSize = this.sizes()[0];
    }
    this.selectedSize.set(currentSize);
  }

  changeSize(size: ProductSize) {
    this.selectedSize.set(size);
  }
}
