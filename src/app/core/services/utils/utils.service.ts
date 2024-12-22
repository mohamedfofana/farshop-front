import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  isInteger(value: string) {
    return /^\d+$/.test(value);
  }

  
}
