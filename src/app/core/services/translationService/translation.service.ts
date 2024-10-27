import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { CodeLanguage } from '../../model/enum/CodeLanguage';
import { LocalStorageService } from '../localStorageService/local-storage.service';
import { SessionConstant } from '../../security/constants/SessionConstants';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(
    private localStorageService: LocalStorageService,
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  changeLanguage(lang: string) {
    this.translateService.use(lang);
    if (isPlatformBrowser(this.platformId)) {
      this.localStorageService.setItem(SessionConstant.CURRENT_LANGUAGE, lang);
    }
  }

  getCurrentLanguage(): string {
    const storedLang = this.localStorageService.getItem(SessionConstant.CURRENT_LANGUAGE);
    const currentCodeLangue = Object.values(CodeLanguage).find(
      (s) => s === storedLang
    );
    if (currentCodeLangue) {
      return currentCodeLangue;
    }
    return this.translateService.currentLang;
  }
}
