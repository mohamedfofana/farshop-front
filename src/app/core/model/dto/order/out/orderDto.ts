import { Address } from '../../../db/address';
import { OrderProductDto } from '../../orderproduct/orderProductDto';

export interface OrderDto {
  firstname?: string;
  lastname?: string;
  email?: string;
  phonenumber?: string;
  deliveryAddress?: Address;
  billingAddress?: Address;
  amount?: number;
  currency?: string;
  orderProducts?: OrderProductDto[];
}
