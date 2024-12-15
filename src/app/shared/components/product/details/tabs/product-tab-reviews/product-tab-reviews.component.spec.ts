import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTabReviewsComponent } from './product-tab-reviews.component';

describe('ProductReviewsComponent', () => {
  let component: ProductTabReviewsComponent;
  let fixture: ComponentFixture<ProductTabReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTabReviewsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTabReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
