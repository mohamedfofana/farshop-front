import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { StarRatingComponent } from '../../common/star-rating/star-rating.component';
import { Review } from '../../../../core/model/db/review';
import { ReviewRatePipe } from '../../../../core/pipe/review-rate.pipe';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-star-rating-review',
  standalone: true,
  imports: [CommonModule, StarRatingComponent, TranslateModule],
  templateUrl: './star-rating-review.component.html',
})
export class StarRatingReviewComponent {
  size = input<'sm' | 'lg'>('sm');
  showReviewsNumber = input(false);
  showRatingSize = input(false);
  reviews = input<Review[]>([]);
  rate = computed(() => new ReviewRatePipe().transform(this.reviews()));
}
