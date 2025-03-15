import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutAddressesStepComponent } from './checkout-addresses-step.component';

describe('CheckoutDeliveryStepComponent', () => {
  let component: CheckoutAddressesStepComponent;
  let fixture: ComponentFixture<CheckoutAddressesStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutAddressesStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutAddressesStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
