import { TestBed } from '@angular/core/testing';

import { TranslateService } from '@ngx-translate/core';
import { translateServiceStub } from '../../../../tests/stubs/translateServiceStub';
import { CodeLanguage } from '../../model/enum/CodeLanguage';
import { LocalStorageService } from '../localStorageService/local-storage.service';
import { TranslationService } from './translation.service';

let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

describe('TranslationService', () => {
  let service: TranslationService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LocalStorageService', [
      'getItem',
      'setItem',
    ]);
    TestBed.configureTestingModule({
      providers: [
        { provide: TranslateService, useValue: translateServiceStub },
        { provide: LocalStorageService, useValue: spy },
      ],
    });
    service = TestBed.inject(TranslationService);
    localStorageServiceSpy = TestBed.inject(
      LocalStorageService
    ) as jasmine.SpyObj<LocalStorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should change language created', () => {
    let expectedValue = CodeLanguage.FR;
    localStorageServiceSpy.setItem.and.stub;
    service.changeLanguage(expectedValue);
    //expect(translateServiceStub.use).toHaveBeenCalledTimes(1);
    expect(localStorageServiceSpy.setItem.calls.count()).toBe(1);
  });

  it('should return currentLanguage from localStorage created', () => {
    let expectedValue = CodeLanguage.FR;
    localStorageServiceSpy.getItem.and.returnValue(expectedValue);
    expect(service.getCurrentLanguage()).toBe(expectedValue);
  });

  it('should return currentLanguage from defaultValue created', () => {
    let expectedValue = navigator.language.split('-')[0];
    localStorageServiceSpy.getItem.and.returnValue('');
    expect(service.getCurrentLanguage()).toBe(expectedValue);
  });
});
