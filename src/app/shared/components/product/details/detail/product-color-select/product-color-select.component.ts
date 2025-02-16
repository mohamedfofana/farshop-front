import { Component, input } from '@angular/core';
import { ProductColor } from '@core/model/db/productColor';
import { NgStyle } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-color-select',
  standalone: true,
  imports: [NgStyle, TranslateModule],
  templateUrl: './product-color-select.component.html',
  styleUrl: './product-color-select.component.scss',
})
export class ProductColorSelectComponent {
  colors = input.required<ProductColor[]>();
}
