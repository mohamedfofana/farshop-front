import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  numberPattern = /^\d+$/;
  // Regular Expression by RFC 5322 for Email Validation
  mailPattern = /^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;

  isInteger(value: string) {
    return this.numberPattern.test(value);
  }

  isEmail(value: string) {
    return this.mailPattern.test(value);
  }
}
