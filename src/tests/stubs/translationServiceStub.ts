import { CodeLanguage } from '../../app/core/model/enum/codeLanguage';
import { TranslationService } from '../../app/core/services/translationService/translation.service';

export let translationServiceStub: Partial<TranslationService> = {
  changeLanguage: (lang) => {},
  getCurrentLanguage() {
    return CodeLanguage.FR;
  },
};
