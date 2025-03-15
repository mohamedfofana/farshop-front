import { OrderProductDto } from '../orderproduct/orderProductDto';

export interface SaveOrderDto {
  stripePaymentId: string;
  phonenumber?: string;
  deliveryAddressId: number;
  billingAddressId: number;
  amount: number;
  currency: string;
  orderProducts: OrderProductDto[];
}
