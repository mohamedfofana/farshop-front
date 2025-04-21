import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCharacteristicsComponent } from './product-characteristics.component';

describe('ProductDetailComponent', () => {
  let component: ProductCharacteristicsComponent;
  let fixture: ComponentFixture<ProductCharacteristicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCharacteristicsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCharacteristicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
