import { EventEmitter } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

export let translateServiceStub: Partial<TranslateService> = {
  use: (lang) => {
    return of('');
  },
  get(key, interpolateParams) {
    if (key.includes('form.required')) {
      return of('required');
    }
    if (key.includes('form.email-invalid')) {
      return of('invalid email');
    }
    return of('');
  },
  currentLang: 'en',
  onLangChange: new EventEmitter<LangChangeEvent>(),
  onTranslationChange: new EventEmitter(),
  onDefaultLangChange: new EventEmitter(),
  setDefaultLang(lang) {},
};
