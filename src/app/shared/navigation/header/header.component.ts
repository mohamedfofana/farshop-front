import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { TranslateModule } from '@ngx-translate/core';
import { LoginButtonComponent } from '../../components/buttons/login-button.component';
import { SignupButtonComponent } from '../../components/buttons/signup-button.component';
import { LogoutButtonComponent } from '../../components/buttons/logout-button.component';
import { SearchComponent } from '../../components/buttons/search/search.component';
import { HeaderTopComponent } from '../header-top/header-top.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule,
    UpperCasePipe,
    LoginButtonComponent,
    SignupButtonComponent,
    LogoutButtonComponent,
    SearchComponent,
    HeaderTopComponent,
  ],
  templateUrl: './header.component.html',
  animations: [
    trigger('showHeaderTopTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('50ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('150ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  isLoggedIn$ = this.authService.isAuthenticated$;
  showHeaderTop = true;
  headerBottomonTop = false;

  constructor() {
    this.showHeaderTop = true;
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    const scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollPosition === 0) {
      this.showHeaderTop = true;
    } else {
      this.showHeaderTop = false;
    }
  }
}
