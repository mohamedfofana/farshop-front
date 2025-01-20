import { Category } from './category';
import { ProductStatus } from '../enum/productStatus';
import { Review } from './review';
import { ProductDescription } from './productDescription';
import { ProductDetail } from './productDetail';

export interface Product {
  id: number;
  thumnailUrl: String;
  title: string;
  description: string;
  price: number;
  brand: string;
  stock: number;
  discountPercentage: number;
  status: ProductStatus;
  rating: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  reviews: Review[];
  descriptions: ProductDescription[];
  details: ProductDetail[];
}
