import { Component, input } from '@angular/core';
import { Product } from '../../../../../../core/model/product';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [],
  templateUrl: './product-tab-reviews.component.html',
  styleUrl: './product-tab-reviews.component.scss',
})
export class ProductTabReviewsComponent {
  product = input.required<Product>();
}
