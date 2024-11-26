import { Customer } from '../../../core/model/customer';
import { Product } from '../../../core/model/product';

export interface Review {
  id: number;
  title: string;
  rate: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  customer: Customer;
  product: Product;
  flagged: Customer[];
  useful: Customer[];
}
