import { isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CodeLanguage } from './core/model/enum/CodeLanguage';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private translateService = inject(TranslateService);
  private cookieService = inject(SsrCookieService);
  private authService = inject(AuthService);
  title = 'farshop-front';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initLanguage();
    this.initToken();
  }

  private initLanguage() {
    let defaultLang = this.translateService.currentLang;
    if (isPlatformBrowser(this.platformId)) {
      const storedLang = localStorage.getItem('lng');
      const currentCodeLangue = Object.values(CodeLanguage).find(
        (s) => s === storedLang
      );
      if (currentCodeLangue) {
        defaultLang = currentCodeLangue;
      }
      this.translateService.setDefaultLang(defaultLang);
      this.translateService.use(defaultLang);
    }
  }

  private initToken() {
    if (this.authService.idTokenClaims$) {
      this.authService.idTokenClaims$.subscribe((token) => {
        const jwt = token?.__raw;
        if (jwt) {
          this.cookieService.set('jwt', jwt);
        }
      });
    }
  }
}
