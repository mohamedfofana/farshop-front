import { Component, input } from '@angular/core';
import { ProductDescription } from '@core/model/db/productDescription';

@Component({
  selector: 'app-product-description',
  standalone: true,
  imports: [],
  templateUrl: './product-tab-description.component.html',
  styleUrl: './product-tab-description.component.scss',
})
export class ProductDescriptionComponent {
  descriptions = input.required<ProductDescription[]>();
}
