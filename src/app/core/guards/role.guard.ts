import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/authenticationService/authentication.service';
import { inject } from '@angular/core';
import { CustomerRole } from '../model/enum/customerRole';

export const UserGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);

  return authenticationService.hasRole$(CustomerRole.USER);
};
