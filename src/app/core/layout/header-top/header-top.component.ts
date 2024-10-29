import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { TranslationService } from '../../services/translationService/translation.service';
import { CodeLanguage } from '../../model/enum/CodeLanguage';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

type Language = {
  code: string;
  value: string;
};
@Component({
  selector: 'app-header-top',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './header-top.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderTopComponent {
  browserLanguage = signal('');
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
    this.browserLanguage.set(event.target.value)
  }
}
