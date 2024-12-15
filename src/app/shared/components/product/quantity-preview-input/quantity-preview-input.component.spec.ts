import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityPreviewInputComponent } from './quantity-preview-input.component';

describe('QuantityPreviewInputComponent', () => {
  let component: QuantityPreviewInputComponent;
  let fixture: ComponentFixture<QuantityPreviewInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantityPreviewInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuantityPreviewInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
