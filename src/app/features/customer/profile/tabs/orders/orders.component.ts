import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OrderService } from '@app/core/services/http/order/order.service';
import { OrderPreviewComponent } from '../../../../../shared/components/profile/order-preview/order-preview.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, OrderPreviewComponent, TranslateModule],
  templateUrl: './orders.component.html',
})
export class OrdersComponent {
  private readonly orderService = inject(OrderService);
  orders$ = this.orderService.findAll();
}
