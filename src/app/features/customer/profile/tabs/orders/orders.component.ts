import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OrderService } from '@app/core/services/http/order/order.service';
import { OrderPreviewComponent } from '../../../../../shared/components/profile/order-preview/order-preview.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [AsyncPipe, OrderPreviewComponent],
  templateUrl: './orders.component.html',
})
export class OrdersComponent {
  private readonly orderService = inject(OrderService);
  orders$ = this.orderService.findAll();
}
