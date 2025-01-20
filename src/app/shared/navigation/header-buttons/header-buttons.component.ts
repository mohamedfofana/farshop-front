import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe, NgIf, UpperCasePipe } from '@angular/common';
import { SearchDialogComponent } from '../../components/dialog/search-dialog/search-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@auth0/auth0-angular';
import { AuthenticationService } from '../../../core/services/authenticationService/authentication.service';
import { LogoutButtonComponent } from '../../components/common/buttons/logout/logout-button.component';

@Component({
  selector: 'app-header-buttons',
  standalone: true,
  imports: [
    LogoutButtonComponent,
    RouterLink,
    TranslateModule,
    UpperCasePipe,
    AsyncPipe,
    NgIf,
  ],
  template: `
    <div class="dropdown justify-content-end d-flex">
      <div class="ps-3 mb-1 pt-0-15-rem">
        <a href="javascript:void(0)" (click)="openDialog()">
          <i class="bi bi-search h5 text-dark"></i>
        </a>
      </div>

      <ng-container *ngIf="isLoggedIn$ | async; else unAuthenticated">
        <div class="ps-3">
          <a
            href="#"
            class="d-block link-body-emphasis text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-person-circle h3"></i>
          </a>
          <ul class="dropdown-menu dropdown-menu-end text-small">
            <li>
              <a class="dropdown-item" [routerLink]="['profile']">{{
                'user.menu.profile' | translate | uppercase
              }}</a>
            </li>
            <li>
              <a class="dropdown-item" [routerLink]="['settings']">{{
                'user.menu.settings' | translate | uppercase
              }}</a>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li class="text-center">
              <app-logout-button></app-logout-button>
            </li>
          </ul>
        </div>
      </ng-container>

      <ng-template #unAuthenticated>
        <div class="ps-3 mb-1">
          <a href="javascript:void(0)" (click)="login()">
            <i class="bi bi-person h4 text-dark"></i>
          </a>
        </div>
      </ng-template>

      <div class="ps-3 mb-1">
        <a href="#">
          <i class="bi bi-cart2 h4 text-dark"></i>
        </a>
      </div>
    </div>
  `,
  styles: ``,
})
export class HeaderButtonsComponent {
  readonly dialog = inject(MatDialog);
  private authenticationService = inject(AuthenticationService);
  private authService = inject(AuthService);
  isLoggedIn$ = this.authService.isAuthenticated$;

  openDialog(): void {
    this.dialog.open(SearchDialogComponent);
  }

  login() {
    this.authenticationService.login();
  }
}
