import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/db/product';
import { ProductPrices } from '../model/types/productPrices';

@Pipe({
  name: 'productPricesPipe',
  standalone: true,
})
export class ProductPricesPipe implements PipeTransform {
  transform(product: Product): ProductPrices {
    const discount = product.discountPercentage === 0;
    const discountPercentagePercent = product.discountPercentage / 100;
    let finalPrice = product.price;
    if (product.discountPercentage > 0) {
      finalPrice = ((100 - product.discountPercentage) * product.price) / 100;
    }

    return {
      discount: discount,
      discountPercentagePercent: discountPercentagePercent,
      finalPrice: finalPrice,
      price: product.price,
      savedPrice: product.price - finalPrice,
    };
  }
}
