import { Component, computed, input } from '@angular/core';
import moment from 'moment';
import { LikeDislikeButtonComponent } from '../../../like-dislike-button/like-dislike-button.component';
import { StarRatingComponent } from '../../../common/star-rating/star-rating.component';
import { Review } from '../../../../../core/model/db/review';

@Component({
  selector: 'app-review-view',
  standalone: true,
  imports: [StarRatingComponent, LikeDislikeButtonComponent],
  templateUrl: './review-view.component.html',
  styleUrl: './review-view.component.scss',
})
export class ReviewViewComponent {
  review = input.required<Review>();
  timeElapsed = computed(() => {
    const currentDate = moment(this.review().createdAt);
    return currentDate.fromNow();
  });
}
