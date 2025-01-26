import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../../logger/logger.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerService {
  loggerService = inject(LoggerService);

  handle(error: any) {
    // Log the error, send it to a remote service, or perform other actions
    this.loggerService.error('An error occurred:', error);
    return throwError(() => error);
  }
}
