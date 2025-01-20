import { ProductColor } from './productColor';
import { ProductSize } from './productSize';

export interface Category {
  id: number;
  title: string;
  type: string;
  colors: ProductColor[];
  sizes: ProductSize[];
}
