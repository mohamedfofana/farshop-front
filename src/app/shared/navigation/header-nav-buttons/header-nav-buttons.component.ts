import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe, NgIf, UpperCasePipe } from '@angular/common';
import { SearchDialogComponent } from '../../components/dialog/search-dialog/search-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@auth0/auth0-angular';
import { LogoutButtonComponent } from '../../components/common/buttons/logout/logout-button.component';
import { StorageService } from '../../../core/services/storage/storage.service';
import { AuthenticationService } from '../../../core/services/authenticationService/authentication.service';

@Component({
  selector: 'app-header-nav-buttons',
  standalone: true,
  imports: [
    LogoutButtonComponent,
    RouterLink,
    TranslateModule,
    UpperCasePipe,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './header-nav-buttons.component.html',
  styles: ``,
})
export class HeaderNavButtonsComponent {
  readonly dialog = inject(MatDialog);
  readonly authenticationService = inject(AuthenticationService);
  private storageService = inject(StorageService);
  private authService = inject(AuthService);
  user$ = this.authService.user$;
  isLoggedIn$ = this.authService.isAuthenticated$;
  productCount = computed(() => this.storageService.productCount());

  openDialog(): void {
    this.dialog.open(SearchDialogComponent);
  }

  login() {
    this.authenticationService.login();
  }
}
