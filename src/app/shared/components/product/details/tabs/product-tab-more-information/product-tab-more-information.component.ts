import { Component, input } from '@angular/core';
import { Product } from '../../../../../../core/model/product';

@Component({
  selector: 'app-product-more-information',
  standalone: true,
  imports: [],
  templateUrl: './product-tab-more-information.component.html',
  styleUrl: './product-tab-more-information.component.scss',
})
export class ProductMoreInformationComponent {
  product = input.required<Product>();
}
