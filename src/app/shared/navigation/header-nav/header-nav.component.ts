import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ROUTE_PATH } from '../../../core/config/routes/routesConfig';

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [RouterLink, TranslateModule, UpperCasePipe],
  template: `
   <nav class="nav nav-underline justify-content-center">
              <a class="nav-item nav-link link-body-emphasis" [routerLink]="homePath">{{
                "header.menu.home" | translate | uppercase
              }}</a>
              <a
                class="nav-item nav-link link-body-emphasis dropdown dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                ><span></span
                >{{ "header.menu.categories" | translate | uppercase }}</a
              >
              <ul class="dropdown-menu">
                <li>
                  <a
                    class="dropdown-item text-capitalize"
                    [routerLink]="['product/categorie']"
                    >{{ "Categorie" | translate | uppercase }}</a
                  >
                </li>
              </ul>
              <a
                class="nav-item nav-link link-body-emphasis"
                [routerLink]="['promotions']"
                >{{ "header.menu.promotions" | translate | uppercase }}</a
              >
              <a
                class="nav-item nav-link link-body-emphasis"
                [routerLink]="['contact']"
                >{{ "header.menu.contact" | translate | uppercase }}</a
              >
            </nav>
  `,
  styles: ``
})
export class HeaderNavComponent {
  homePath = ROUTE_PATH.HOME;

}
