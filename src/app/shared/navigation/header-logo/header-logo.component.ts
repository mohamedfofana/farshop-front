import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ROUTE_PATH } from '@core/config/routes/routesConfig';

@Component({
  selector: 'app-header-logo',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a
      [routerLink]="homePath"
      class="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
    >
      <img
        src="farshop-logo.png"
        width="105"
        height="100"
        class="d-inline-block align-top"
        alt=""
      />
    </a>
  `,
  styles: ``,
})
export class HeaderLogoComponent {
  readonly homePath = ROUTE_PATH.HOME;
}
