import { Routes } from '@angular/router';
import { ROUTE_PATH } from '@core/config/routes/routesConfig';
import { AuthGuard } from '@auth0/auth0-angular';
import { RoleGuard } from '@core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTE_PATH.HOME,
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./shared/navigation/base-layout/base-layout.component').then(
        (mod) => mod.BaseLayoutComponent
      ),
    children: [
      {
        path: ROUTE_PATH.PRODUCT_DETAIL,
        loadComponent: () =>
          import(
            './features/product/product-detail/product-detail.component'
          ).then((mod) => mod.ProductDetailsComponent),
      },
      {
        path: ROUTE_PATH.CATEGORY_DETAIL,
        loadComponent: () =>
          import(
            './features/category/category-list/category-list.component'
          ).then((mod) => mod.CategoryListComponent),
      },
      {
        path: ROUTE_PATH.HOME,
        loadComponent: () =>
          import('./features/home/home.component').then(
            (mod) => mod.HomeComponent
          ),
      },
      {
        path: ROUTE_PATH.PRODUCT_SEARCH,
        loadComponent: () =>
          import(
            './features/product/product-search-result/product-search-result.component'
          ).then((mod) => mod.ProductSearchResultComponent),
      },
      {
        path: ROUTE_PATH.CONTACT,
        loadComponent: () =>
          import('./features/contact/contact.component').then(
            (mod) => mod.ContactComponent
          ),
      },
      {
        path: ROUTE_PATH.ABOUT,
        loadComponent: () =>
          import('./features/about/about.component').then(
            (mod) => mod.AboutComponent
          ),
      },
      {
        path: ROUTE_PATH.CALLBACK,
        loadComponent: () =>
          import('./features/callback/callback.component').then(
            (mod) => mod.CallbackComponent
          ),
      },
      {
        path: ROUTE_PATH.PAGE_NOT_FOUND,
        loadComponent: () =>
          import('./features/page-not-found/page-not-found.component').then(
            (mod) => mod.PageNotFoundComponent
          ),
      },
      {
        path: ROUTE_PATH.PROFILE,
        loadComponent: () =>
          import('./features/customer/profile/profile.component').then(
            (mod) => mod.ProfileComponent
          ),
        canActivate: [AuthGuard, RoleGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: ROUTE_PATH.PAGE_NOT_FOUND,
  },
];
