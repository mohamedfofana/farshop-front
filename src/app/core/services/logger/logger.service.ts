import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  info(message: string, data: any) {
    console.info(message);
    console.info(data);
  }

  warn(message: string, data: any) {
    console.warn(message);
    console.warn(data);
  }

  error(message: string, error: any) {
    console.error(message);
  }
}
