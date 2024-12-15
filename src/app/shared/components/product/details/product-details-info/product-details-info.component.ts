import { Component, input } from '@angular/core';
import { Product } from '../../../../../core/model/product';
import { ProductPriceViewComponent } from '../../product-price-rating/product-price-view.component';

@Component({
  selector: 'app-product-details-info',
  standalone: true,
  imports: [ProductPriceViewComponent],
  templateUrl: './product-details-info.component.html',
  styleUrl: './product-details-info.component.scss',
})
export class ProductDetailsInfoComponent {
  product = input.required<Product>();
}
