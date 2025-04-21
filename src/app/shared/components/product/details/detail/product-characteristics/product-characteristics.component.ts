import { Component, input } from '@angular/core';
import { ProductDetail } from '@core/model/db/productDetail';

@Component({
  selector: 'app-product-characteristics',
  standalone: true,
  imports: [],
  templateUrl: './product-characteristics.component.html',
  styleUrl: './product-characteristics.component.scss',
})
export class ProductCharacteristicsComponent {
  details = input.required<ProductDetail[]>();
}
