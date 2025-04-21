import { Component, input } from '@angular/core';
import { ProductPreviewComponent } from '../product-preview/product-preview.component';
import { Product } from '@core/model/db/product';

@Component({
  selector: 'app-product-list-details',
  standalone: true,
  imports: [ProductPreviewComponent],
  template: `
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5">
      @for (product of products(); track $index) {
      <div class="product-item p-1 mt-4">
        <app-product-preview [product]="product" />
      </div>
      }
    </div>
  `,
  styleUrl: './product-list-details.component.scss',
})
export class ProductListDetailsComponent {
  products = input.required<Product[]>();
}
