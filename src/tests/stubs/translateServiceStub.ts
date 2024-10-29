import { EventEmitter } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

export let translateServiceStub: Partial<TranslateService> = {
  use: (lang) => {
    return of('');
  },
  get(key, interpolateParams) {
    return of('');
  },
  currentLang: 'en',
  onLangChange: new EventEmitter<LangChangeEvent>(),
  onTranslationChange: new EventEmitter(),
  onDefaultLangChange: new EventEmitter(),
  setDefaultLang(lang) {},
};
