import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderTopComponent } from '../header-top/header-top.component';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from '../../components/dialog/search-dialog/search-dialog.component';
import { HeaderNavComponent } from '../header-nav/header-nav.component';
import { HeaderButtonsComponent } from '../header-buttons/header-buttons.component';
import { HeaderLogoComponent } from '../header-logo/header-logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    HeaderTopComponent,
    HeaderNavComponent,
    HeaderButtonsComponent,
    HeaderLogoComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  isLoggedIn$ = this.authService.isAuthenticated$;
  showHeaderTop = true;
  readonly dialog = inject(MatDialog);
  private document = inject(DOCUMENT);

  constructor() {
    this.setTopHeaders();
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
