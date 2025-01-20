import { Component } from '@angular/core';
import { StarRatingComponent } from '../../../common/star-rating/star-rating.component';
import { ThemeButtonComponent } from '../../../common/buttons/theme-button/theme-button.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-review-create-form',
  standalone: true,
  imports: [ThemeButtonComponent, StarRatingComponent, TranslateModule],
  template: `
    <div class="add_review">
      <form id="review_form" action="post">
        <div>
          <h1>{{ 'product.section.review.form.title' | translate }}</h1>
        </div>
        <div>
          <h1>{{ 'product.section.review.form.rating' | translate }}</h1>
          &nbsp;
          <app-star-rating [rate]="'0'" [size]="'sm'" />
          <textarea
            id="review_message"
            class="input_review"
            name="message"
            placeholder="{{
              'product.section.review.form.placeholder' | translate
            }}"
            rows="4"
            required
          ></textarea>
        </div>
        <div class="text-left text-sm-right">
          <app-theme-button />
        </div>
      </form>
    </div>
  `,
  styleUrl: './review-create-form.component.scss',
})
export class ReviewCreateFormComponent {}
