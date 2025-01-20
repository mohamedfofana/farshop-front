import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarRatingReviewComponent } from './star-rating-review.component';

describe('StarRatingComponent', () => {
  let component: StarRatingReviewComponent;
  let fixture: ComponentFixture<StarRatingReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarRatingReviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StarRatingReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
