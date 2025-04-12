import { Product } from '../../db/product';
import { ProductColor } from '../../db/productColor';
import { ProductSize } from '../../db/productSize';

export interface OrderProductDto {
  idProduct?: number;
  product?: Product;
  quantity?: number;
  price?: number;
  discountPercentage?: number;
  selectedColor?: ProductColor;
  selectedSize?: ProductSize;
}
