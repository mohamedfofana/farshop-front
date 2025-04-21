import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAddEditDialogComponent } from './payment-add-edit-dialog.component';

describe('PaymentAddEditDialogComponent', () => {
  let component: PaymentAddEditDialogComponent;
  let fixture: ComponentFixture<PaymentAddEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentAddEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentAddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
