import { Pipe, PipeTransform } from '@angular/core';
import { Review } from '../../features/review/model/review';

@Pipe({
  name: 'reviewSize',
  standalone: true,
})
export class ReviewSizePipe implements PipeTransform {
  transform(reviews: Review[] | undefined): string {
    const count = reviews && reviews.length > 0 ? reviews.length : 0;
    if (count > 1) {
      return count + ' reviews';
    }
    return '';
  }
}
