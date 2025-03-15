import { OrderProductDto } from '../orderproduct/orderProductDto';

export interface PaymentDto {
  amount: number;
  currency: 'usd' | 'cad';
  orderProducts: OrderProductDto[];
}
