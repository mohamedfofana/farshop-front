import { Observable } from 'rxjs';
import { Product } from '../../db/product';
import { ProductColor } from '../../db/productColor';
import { ProductSize } from '../../db/productSize';

export interface CartProductDto {
  id: number;
  product$?: Observable<Product>;
  quantity: number;
  selectedColor?: ProductColor;
  selectedSize?: ProductSize;
}
