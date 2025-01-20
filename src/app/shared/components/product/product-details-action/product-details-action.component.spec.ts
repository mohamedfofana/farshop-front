import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsActionComponent } from './product-details-action.component';

describe('ProductDetailsActionComponent', () => {
  let component: ProductDetailsActionComponent;
  let fixture: ComponentFixture<ProductDetailsActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
