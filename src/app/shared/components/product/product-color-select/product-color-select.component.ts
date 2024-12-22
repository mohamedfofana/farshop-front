import { Component } from '@angular/core';

@Component({
  selector: 'app-product-color-select',
  standalone: true,
  imports: [],
  template: `
    <div class="product_color pt-2">
      <span>Select Color:</span>
      <ul>
        <li style="background: #e54e5d"></li>
        <li style="background: #252525"></li>
        <li style="background: #60b3f3"></li>
      </ul>
    </div>
  `,
  styles: `
  .product_color ul {
  display: inline-block;
  margin-left: 26px;
}
.product_color ul li {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 29px;
  cursor: pointer;
}`,
})
export class ProductColorSelectComponent {}
