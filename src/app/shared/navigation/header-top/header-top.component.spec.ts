import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTopComponent } from './header-top.component';
import { TranslateService } from '@ngx-translate/core';
import { translateServiceStub } from '../../../../tests/stubs/translateServiceStub';
import { TranslationService } from '../../../core/services/translationService/translation.service';
import { translationServiceStub } from '../../../../tests/stubs/translationServiceStub';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CodeLanguage } from '../../../core/model/enum/CodeLanguage';
import { DebugElement } from '@angular/core';

describe('HeaderTopComponent', () => {
  let component: HeaderTopComponent;
  let fixture: ComponentFixture<HeaderTopComponent>;
  let selectEl: HTMLSelectElement;
  let selectOptionsEl: DebugElement[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderTopComponent],
      providers: [
        provideRouter([]),
        { provide: TranslationService, useValue: translationServiceStub },
        { provide: TranslateService, useValue: translateServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    selectEl = fixture.debugElement.query(By.css('.form-select')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select english', () => {
    expect(component.browserLanguage()).toBe(CodeLanguage.FR);
    expect(selectEl.selectedIndex).toBe(0);
    selectEl.selectedIndex = 1;
    selectEl.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.browserLanguage()).toBe(CodeLanguage.EN);
  });
});
