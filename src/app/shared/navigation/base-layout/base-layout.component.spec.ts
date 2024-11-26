import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLayoutComponent } from './base-layout.component';
import { provideRouter } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { translateServiceStub } from '../../../../tests/stubs/translateServiceStub';

describe('BaseLayoutComponent', () => {
  let component: BaseLayoutComponent;
  let fixture: ComponentFixture<BaseLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseLayoutComponent],
      providers: [
        provideRouter([]),
        { provide: TranslateService, useValue: translateServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
