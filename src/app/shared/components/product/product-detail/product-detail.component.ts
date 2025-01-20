import { Component, input } from '@angular/core';
import { ProductDetail } from '../../../../core/model/db/productDetail';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  details = input.required<ProductDetail[]>();
}
