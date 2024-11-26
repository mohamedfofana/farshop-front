import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { provideRouter } from '@angular/router';
import { TranslationService } from '../../../core/services/translationService/translation.service';
import { translationServiceStub } from '../../../../tests/stubs/translationServiceStub';
import { TranslateService } from '@ngx-translate/core';
import { translateServiceStub } from '../../../../tests/stubs/translateServiceStub';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninComponent],
      providers: [
        provideRouter([]),
        provideAnimations(),
        { provide: TranslateService, useValue: translateServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
