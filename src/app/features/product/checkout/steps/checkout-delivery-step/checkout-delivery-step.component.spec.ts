import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutDeliveryStepComponent } from './checkout-delivery-step.component';

describe('CheckoutDeliveryStepComponent', () => {
  let component: CheckoutDeliveryStepComponent;
  let fixture: ComponentFixture<CheckoutDeliveryStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutDeliveryStepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutDeliveryStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
