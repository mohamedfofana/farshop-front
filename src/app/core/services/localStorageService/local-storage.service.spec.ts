import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { CodeLanguage } from '../../model/enum/CodeLanguage';
import * as fromNgCommon from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  describe('is a platforBrowser', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(LocalStorageService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should setItem created', () => {
      spyOn(localStorage, 'setItem').and.callFake;
      service.setItem('', '');
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });

    it('should getItem return value', () => {
      const expectedValue = CodeLanguage.FR;
      spyOn(localStorage, 'getItem').and.returnValue(expectedValue);
      expect(service.getItem('')).toBe(expectedValue);
    });
  });

  describe('is not a platforBrowser', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [{ provide: PLATFORM_ID }],
      });
      service = TestBed.inject(LocalStorageService);
    });

    it('should getItem return null', () => {
      //spyOn(fromNgCommon, 'isPlatformBrowser').and.returnValue(false);
      //spyOn(localStorage, 'getItem').and.returnValue(expectedValue);
      expect(service.getItem('')).toBeNull();
    });
  });
});
