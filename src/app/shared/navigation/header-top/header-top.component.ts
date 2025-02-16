import { Component, computed, inject, signal } from '@angular/core';
import { TranslationService } from '@core/services/translationService/translation.service';
import { CodeLanguage } from '@core/model/enum/codeLanguage';
import { TranslateModule } from '@ngx-translate/core';
import { SocialMediaComponent } from '../../components/product/social-media/social-media.component';
import { AuthenticationService } from '@core/services/authenticationService/authentication.service';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

type Language = {
  code: string;
  value: string;
};
@Component({
  selector: 'app-header-top',
  standalone: true,
  imports: [TranslateModule, SocialMediaComponent, CommonModule],
  templateUrl: './header-top.component.html',
})
export class HeaderTopComponent {
  private authenticationService = inject(AuthenticationService);
  private authService = inject(AuthService);
  isLoggedIn$ = this.authService.isAuthenticated$;

  FRENCH = 'Français';
  ENGLISH = 'English';
  browserLanguage = signal('');
  selectedLanguage = computed(() => {
    if (this.browserLanguage() === CodeLanguage.FR) {
      return this.FRENCH;
    }
    if (this.browserLanguage() === CodeLanguage.EN) {
      return this.ENGLISH;
    }
    return '';
  });
  private translationService = inject(TranslationService);

  readonly languages: Language[] = [
    {
      code: CodeLanguage.FR,
      value: this.FRENCH,
    },
    {
      code: CodeLanguage.EN,
      value: this.ENGLISH,
    },
  ];

  constructor() {
    this.browserLanguage.set(this.translationService.getCurrentLanguage());
  }

  changeLanguage(lang: string) {
    this.translationService.changeLanguage(lang);
    this.browserLanguage.set(lang);
  }

  login() {
    this.authenticationService.login();
  }

  register() {
    this.authenticationService.signup();
  }

  logout() {
    this.authenticationService.logout();
  }
}
