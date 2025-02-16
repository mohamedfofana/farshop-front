import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { SearchDialogComponent } from '../../components/dialog/search-dialog/search-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@auth0/auth0-angular';
import { StorageService } from '../../../core/services/storage/storage.service';
import { AuthenticationService } from '../../../core/services/authenticationService/authentication.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { CartComponent } from '../../components/product/cart/cart.component';
import { LogoutButtonComponent } from '../../components/common/buttons/logout/logout-button.component';

@Component({
  selector: 'app-header-nav-buttons',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule,
    AsyncPipe,
    OverlayModule,
    NgIf,
    CartComponent,
    LogoutButtonComponent,
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
  productCount = computed(() => this.storageService.cartProductCount());
  openCart = signal(false);

  constructor() {
    effect(
      () => {
        if (this.productCount() === 0) {
          this.openCart.set(false);
        }
      },
      { allowSignalWrites: true }
    );
  }

  openDialog(): void {
    this.dialog.open(SearchDialogComponent);
  }

  login() {
    this.authenticationService.login();
  }

  openCloseCart() {
    if (this.productCount() > 0) {

      this.openCart.set(!this.openCart());
    } else {
      this.openCart.set(false);
    }
  }
}
