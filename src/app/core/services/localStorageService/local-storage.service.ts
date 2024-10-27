import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setItem(code: string, value: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(code, value);
    }
  }

  getItem(code: string) {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(code);
    }
    return null;
  }
}
