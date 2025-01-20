import { Pipe, PipeTransform } from '@angular/core';
import { Review } from '../model/db/review';

@Pipe({
  name: 'reviewRate',
  standalone: true,
})
export class ReviewRatePipe implements PipeTransform {
  transform(reviews: Review[] | undefined): string {
    let rate = 0;
    if (reviews && reviews.length > 0) {
      rate =
        reviews.reduce((total, b) => {
          return (total += b.rate);
        }, 0) / reviews.length;
    }
    return parseFloat(parseFloat(rate + '').toFixed(1)) + '';
  }
}
