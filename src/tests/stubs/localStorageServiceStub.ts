import { CodeLanguage } from '../../app/core/model/enum/CodeLanguage';
import { LocalStorageService } from '../../app/core/services/localStorageService/local-storage.service';

export let localStorageServiceStub: Partial<LocalStorageService> = {
  getItem(code) {
    return CodeLanguage.FR;
  },
  setItem(code, value) {},
};
