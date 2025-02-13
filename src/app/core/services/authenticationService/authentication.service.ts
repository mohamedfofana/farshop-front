import { toSignal } from '@angular/core/rxjs-interop';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { TranslationService } from '../translationService/translation.service';
import { DOCUMENT } from '@angular/common';
import { map, Observable } from 'rxjs';
import { CustomerRole } from '../../model/enum/customerRole';

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
        target: window.location.pathname,
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
        target: window.location.pathname,
      },
      authorizationParams: {
        screen_hint: 'signup',
        ui_locales: this.translationService.getCurrentLanguage(),
      },
    });
  }

  hasRole$(role: string): Observable<boolean> {
    return this.auth.idTokenClaims$.pipe(
      map((idToken) => {
        if (idToken) {
          const roles: [string] = idToken['https://farshop.com/roles'];         
          const roleAuth0 = roles.find((r) => r === role);
          if (roleAuth0) {
            return true;
          }
        }
        return false;
      })
    );
  }

  isNewCustomer$(): Observable<boolean> {
    return this.auth.idTokenClaims$.pipe(
      map((idToken) => {
        if (idToken) {
          const newCustomer = idToken['https://farshop.com/newCustomer'];
          if (newCustomer && newCustomer === true) {
            return true;
          }
        }
        return false;
      })
    );
  }
}
