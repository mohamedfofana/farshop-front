import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderTopComponent } from '../header-top/header-top.component';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from '../../components/dialog/search-dialog/search-dialog.component';
import { HeaderNavComponent } from '../header-nav/header-nav.component';
import { HeaderNavButtonsComponent } from '../header-nav-buttons/header-nav-buttons.component';
import { HeaderLogoComponent } from '../header-logo/header-logo.component';
import { AuthenticationService } from '../../../core/services/authenticationService/authentication.service';
import { switchMap } from 'rxjs';
import { CustomerService } from '../../../core/services/http/customer/customer.service';
import { AbstractOnDestroy } from '../../../core/directives/unsubscriber/abstract.ondestroy';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    HeaderTopComponent,
    HeaderNavComponent,
    HeaderNavButtonsComponent,
    HeaderLogoComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent extends AbstractOnDestroy implements OnInit {
  private readonly auth0Service = inject(AuthService);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly customerService = inject(CustomerService);
  isLoggedIn$ = this.auth0Service.isAuthenticated$;
  showHeaderTop = true;
  readonly dialog = inject(MatDialog);
  private document = inject(DOCUMENT);

  constructor() {
    super();
    this.setTopHeaders();
    this.authenticationService.isNewCustomer$().subscribe((isNew) => {
      if (isNew) {
        this.createProfile();
      }
    });
  }

  createProfile() {
    const customer$ = this.auth0Service.user$.pipe(
      switchMap((user) => this.customerService.create(user?.email!))
    );

    this.subscriptions.push(customer$.subscribe());
  }

  ngOnInit(): void {
    this.setTopHeaders();
  }
  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    this.setTopHeaders();
  }

  setTopHeaders() {
    if (this.document) {
      const scrollPosition =
        this.document.documentElement.scrollTop ||
        this.document.body.scrollTop ||
        0;

      if (scrollPosition === 0) {
        this.showHeaderTop = true;
      } else {
        this.showHeaderTop = false;
      }
    }
  }
  openDialog(): void {
    this.dialog.open(SearchDialogComponent);
  }
}
