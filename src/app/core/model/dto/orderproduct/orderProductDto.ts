import { ProductColor } from '../../db/productColor';
import { ProductSize } from '../../db/productSize';

export interface OrderProductDto {
  idProduct?: number;
  quantity?: number;
  selectedColor?: ProductColor;
  selectedSize?: ProductSize;
}
