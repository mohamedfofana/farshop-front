import { CurrencyPipe, PercentPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { OrderProductDto } from '@app/core/model/dto/orderproduct/orderProductDto';

@Component({
  selector: 'app-order-product',
  standalone: true,
  imports: [PercentPipe, CurrencyPipe],
  templateUrl: './order-product.component.html',
  styleUrl: './order-product.component.scss',
})
export class OrderProductComponent {
  orderProduct = input.required<OrderProductDto>();
}
