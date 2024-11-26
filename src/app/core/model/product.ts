import { Category } from './category';
import { Review } from '../../features/review/model/review';
import { ProductStatus } from './productStatus';

export interface Product {
  id: number;
  thumnailUrl: String;
  title: string;
  description: string;
  price: number;
  brand: string;
  details: string;
  stock: number;
  discountPercentage: number;
  status: ProductStatus;
  rating: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  // imageUrls: ImageUrl[];
  reviews: Review[];
  // likes: Customer[];
}
