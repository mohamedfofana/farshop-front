import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ReviewRatePipe } from '../../../core/pipe/review-rate.pipe';
import { Review } from '../../../features/review/model/review';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
})
export class StarRatingComponent {
  showReviewsNumber = input(false);
  showRatingSize = input(false);
  reviews = input<Review[]>([]);
  rate = computed(() => new ReviewRatePipe().transform(this.reviews()));
}
