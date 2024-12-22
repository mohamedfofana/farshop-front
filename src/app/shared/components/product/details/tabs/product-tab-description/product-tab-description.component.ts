import { Component, input } from '@angular/core';
import { Product } from '../../../../../../core/model/product';

@Component({
  selector: 'app-product-description',
  standalone: true,
  imports: [],
  templateUrl: './product-tab-description.component.html',
  styleUrl: './product-tab-description.component.scss'
})
export class ProductDescriptionComponent {
  product = input.required<Product>();
}
