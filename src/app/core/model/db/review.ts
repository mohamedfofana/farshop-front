import { Customer } from './customer';
import { Product } from './product';

export interface Review {
  id: number;
  title: string;
  rate: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  customer: Customer;
  product: Product;
  likes: Customer[];
  unlikes: Customer[];
}
