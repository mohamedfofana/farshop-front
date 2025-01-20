import { inject, Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { TranslationService } from '../translationService/translation.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private auth = inject(AuthService);
  private translationService = inject(TranslationService);
  private doc = inject(DOCUMENT);

  login(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/profile',
      },
      authorizationParams: {
        ui_locales: this.translationService.getCurrentLanguage(),
      },
    });
  }

  logout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: this.doc.location.origin,
      },
    });
  }

  signup(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/profile',
      },
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  }
}
