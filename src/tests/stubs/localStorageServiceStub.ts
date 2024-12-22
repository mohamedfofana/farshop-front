import { CodeLanguage } from '../../app/core/model/enum/codeLanguage';
import { LocalStorageService } from '../../app/core/services/localStorageService/local-storage.service';

export let localStorageServiceStub: Partial<LocalStorageService> = {
  getItem(code) {
    return CodeLanguage.FR;
  },
  setItem(code, value) {},
};
