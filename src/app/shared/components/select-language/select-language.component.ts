import { Component, inject, signal } from '@angular/core';
import { TranslationService } from '../../../core/services/translationService/translation.service';
import { CodeLanguage } from '../../../core/model/enum/CodeLanguage';

type Language = {
  code: string;
  value: string;
};

@Component({
  selector: 'app-select-language',
  standalone: true,
  imports: [],
  template: `
    <select
      class="form-select form-select-sm"
      (change)="changeLanguage($event)"
    >
      @for (language of languages; track language) {
      <option
        class="option-lang"
        value="{{ language.code }}"
        [selected]="language.code === browserLanguage()"
      >
        {{ language.value }}
      </option>
      }
    </select>
  `,
  styles: ``,
})
export class SelectLanguageComponent {
  browserLanguage = signal('');
  selectedLanguage = signal('');
  private translationService = inject(TranslationService);

  readonly languages: Language[] = [
    {
      code: CodeLanguage.FR,
      value: 'Français',
    },
    {
      code: CodeLanguage.EN,
      value: 'English',
    },
  ];

  constructor() {
    this.browserLanguage.set(this.translationService.getCurrentLanguage());
  }

  changeLanguage(event: any) {
    this.translationService.changeLanguage(event.target.value);
    this.browserLanguage.set(event.target.value);
  }
}
