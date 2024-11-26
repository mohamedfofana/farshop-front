import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';

@Pipe({
  name: 'finalProductprice',
  standalone: true,
})
export class FinalProductpricePipe implements PipeTransform {
  transform(product: Product): number {
    if (product.discountPercentage > 0) {
      return ((100 - product.discountPercentage) * product.price) / 100;
    }
    return product.price;
  }
}
