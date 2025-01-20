import { Component, inject, input } from '@angular/core';
import { ReviewService } from '../../../../../../core/services/http/review/review.service';
import { Review } from '../../../../../../core/model/db/review';
import { ReviewViewComponent } from '../../../review/review-view/review-view.component';
import { ReviewCreateFormComponent } from '../../../review/review-create-form/review-create-form.component';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [ReviewCreateFormComponent, ReviewViewComponent],
  templateUrl: './product-tab-reviews.component.html',
  styleUrl: './product-tab-reviews.component.scss',
})
export class ProductTabReviewsComponent {
  reviews = input.required<Review[]>();
  reviewService = inject(ReviewService);
}
