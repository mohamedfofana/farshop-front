import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMoreInformationComponent } from './product-tab-more-information.component';

describe('ProductMoreInformationComponent', () => {
  let component: ProductMoreInformationComponent;
  let fixture: ComponentFixture<ProductMoreInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductMoreInformationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductMoreInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
