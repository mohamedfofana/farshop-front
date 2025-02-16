import { Component, input } from '@angular/core';
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
  sizes = input.required<ProductSize[]>();
}
