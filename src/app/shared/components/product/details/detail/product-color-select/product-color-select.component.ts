import { Component, inject, input, model, OnInit } from '@angular/core';
import { ProductColor } from '@core/model/db/productColor';
import { NgStyle } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { StorageService } from '@app/core/services/storage/storage.service';

@Component({
  selector: 'app-product-color-select',
  standalone: true,
  imports: [NgStyle, TranslateModule],
  templateUrl: './product-color-select.component.html',
  styleUrl: './product-color-select.component.scss',
})
export class ProductColorSelectComponent implements OnInit {
  storageService = inject(StorageService);
  colors = input.required<ProductColor[]>();
  productId = input.required<number>();
  selectedColor = model<ProductColor>();

  ngOnInit(): void {
    let currentColor = this.storageService.findCurrentColor(this.productId());
    if (!currentColor) {
      currentColor = this.colors()[0];
    }
    this.selectedColor.set(currentColor);
  }

  changeColor(color: ProductColor) {
    this.selectedColor.set(color);
  }
}
