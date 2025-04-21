import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(SsrCookieService);

  if (req.url.includes('/public/')) {
    return next(req);
  }

  const token = cookieService.get('jwt');
  if (!token) {
    return next(req);
  }
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(req);
};
