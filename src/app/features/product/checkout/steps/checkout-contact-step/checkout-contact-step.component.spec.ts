import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutContactStepComponent } from './checkout-contact-step.component';

describe('CheckoutContactStepComponent', () => {
  let component: CheckoutContactStepComponent;
  let fixture: ComponentFixture<CheckoutContactStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutContactStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutContactStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
