import { NgStyle, NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { OrderStatus } from '@app/core/model/enum/OrderStatus';

@Component({
  selector: 'app-order-progress',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './order-progress.component.html',
})
export class OrderProgressComponent {
  status = input.required<string>();
  colorDanger = computed(
    () =>
      this.status() !== OrderStatus.CANCELED ||
      this.status() !== OrderStatus.RETURNED
  );
  progressStatusPercent = computed<string>(() => {
    if (this.status() === OrderStatus.APPROVED) {
      return '1%';
    } else if (this.status() === OrderStatus.SHIPPED) {
      return '50%';
    } else {
      return '100%';
    }
    return '0%';
  });
}
