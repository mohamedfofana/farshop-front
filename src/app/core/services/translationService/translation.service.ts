import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { CodeLanguage } from '../../model/enum/codeLanguage';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private storageService = inject(StorageService);

  private translateService = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);
  private readonly defaultLang = navigator.language.split('-')[0];

  constructor() {
    this.translateService.use(this.getCurrentLanguage());
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang);
    if (isPlatformBrowser(this.platformId)) {
      this.storageService.changeLanguage(lang);
    }
  }

  getCurrentLanguage(): string {
    const storedLang = this.storageService.getLanguage();
    if (this.isAppLanguage(storedLang)) {
      return storedLang!;
    }

    return this.defaultLang;
  }

  isAppLanguage(lang: string | null) {
    return Object.values(CodeLanguage).find((s) => s === lang) != undefined;
  }
}
