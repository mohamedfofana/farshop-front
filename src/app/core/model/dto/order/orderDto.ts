import { Address } from '../../db/address';

export interface OrderDto {
  firstname?: string;
  lastname?: string;
  email?: string;
  phonenumber?: string;
  deliveryAddress?: Address;
}
