import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './core/layout/base-layout/base-layout.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ROUTE_PATH } from './core/config/routes/routesConfig';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { SigninComponent } from './pages/user/signin/signin.component';
import { SignupComponent } from './pages/user/signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTE_PATH.HOME,
    pathMatch: 'full',
  },
  {
    path: ROUTE_PATH.SIGNIN,
    component: SigninComponent,
  },
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: ROUTE_PATH.HOME,
        component: HomeComponent,
      },
      {
        path: ROUTE_PATH.CONTACT,
        component: ContactComponent,
      },
      {
        path: ROUTE_PATH.CONTACT,
        component: ContactComponent,
      },
      {
        path: ROUTE_PATH.ABOUT,
        component: AboutComponent,
      },
      {
        path: ROUTE_PATH.SIGNUP,
        component: SignupComponent,
      },
      {
        path: ROUTE_PATH.PAGE_NOT_FOUND,
        component: PageNotFoundComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: ROUTE_PATH.PAGE_NOT_FOUND,
  },
];
