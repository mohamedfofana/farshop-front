import { Injectable, Inject, PLATFORM_ID, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { CodeLanguage } from '../../model/enum/CodeLanguage';
import { LocalStorageService } from '../localStorageService/local-storage.service';
import { SessionConstant } from '../../security/constants/SessionConstants';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private localStorageService = inject(LocalStorageService);
  private translateService = inject(TranslateService);
  private readonly defaultLang = navigator.language.split('-')[0];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.translateService.use(this.defaultLang);
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang);
    if (isPlatformBrowser(this.platformId)) {
      this.localStorageService.setItem(SessionConstant.CURRENT_LANGUAGE, lang);
    }
  }

  getCurrentLanguage(): string {
    const storedLang: string | null = this.localStorageService.getItem(
      SessionConstant.CURRENT_LANGUAGE
    );

    if (this.isAppLanguage(storedLang)) {
      return storedLang!;
    }

    return this.defaultLang;
  }

  isAppLanguage(lang: string | null) {
    return Object.values(CodeLanguage).find((s) => s === lang) != undefined;
  }
}
