import { Address } from '../../../db/address';
import { InvoiceDto } from '../../invoice/in/invoiceDto';
import { OrderProductDto } from '../../orderproduct/orderProductDto';

export interface FindOrderDto {
  id: number;
  status: string;
  phonenumber?: string;
  invoiceNumber: string;
  invoiceData: string;
  invoice: InvoiceDto;
  deliveryAddress: Address;
  billingAddress: Address;
  amount: number;
  currency: string;
  orderProducts: OrderProductDto[];
  createdAt: string;
}
