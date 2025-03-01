import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutConfirmationStepComponent } from './checkout-confirmation-step.component';

describe('CheckoutConfirmationStepComponent', () => {
  let component: CheckoutConfirmationStepComponent;
  let fixture: ComponentFixture<CheckoutConfirmationStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutConfirmationStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutConfirmationStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
