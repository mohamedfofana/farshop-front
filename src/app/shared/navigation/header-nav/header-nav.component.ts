import { UpperCasePipe } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ROUTE_PATH } from '@core/config/routes/routesConfig';
import { CategoryService } from '@core/services/http/category/category.service';
import { Category } from '@core/model/db/category';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [RouterLink, TranslateModule, UpperCasePipe],
  template: `
    <nav class="nav nav-underline justify-content-center">
      <a class="nav-item nav-link link-body-emphasis" [routerLink]="homePath">{{
        'header.menu.home' | translate | uppercase
      }}</a>
      <a
        class="nav-item nav-link link-body-emphasis dropdown dropdown-toggle cursor-hand"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        ><span></span>{{ 'header.menu.categories' | translate | uppercase }}</a
      >
      @if(categories()){
      <ul class="dropdown-menu">
        <li>
          @for (category of categories(); track $index) {
          <a
            class="dropdown-item text-capitalize"
            [routerLink]="['category/', category.id]"
            >{{ category.title | translate | uppercase }}</a
          >}
        </li>
      </ul>
      }
      <a
        class="nav-item nav-link link-body-emphasis"
        [routerLink]="['contact']"
        >{{ 'header.menu.contact' | translate | uppercase }}</a
      >
      <a
        class="nav-item nav-link link-body-emphasis"
        [routerLink]="['about']"
        >{{ 'header.menu.about' | translate | uppercase }}</a
      >
    </nav>
  `,
  styles: ``,
})
export class HeaderNavComponent {
  homePath = ROUTE_PATH.HOME;
  categoryService = inject(CategoryService);

  categories: Signal<Category[] | undefined> = toSignal(
    this.categoryService.findAll()
  );
}
