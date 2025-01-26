import { Injectable } from '@angular/core';
import { RegexPattern } from '../../../model/enum/regexPattern';
import { FormGroup, ValidationErrors } from '@angular/forms';

export interface ControlError {
  control: string;
  error: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  // Regular Expression by RFC 5322 for Email Validation
  emailRegex = new RegExp(RegexPattern.EMAIL);
  numberRegex = new RegExp(RegexPattern.NUMBER);

  isInteger(value: string) {
    return this.numberRegex.test(value);
  }

  isEmail(value: string) {
    return this.emailRegex.test(value);
  }

  getErrosFromFormGroup(formGroup: FormGroup) {
    const result: ControlError[] = [];
    Object.keys(formGroup.controls).forEach((key) => {
      const controlErrors: ValidationErrors | null = formGroup.get(key)!.errors;
      if (controlErrors) {
        const firstKeyError = Object.keys(controlErrors)[0];
        result.push({
          control: key,
          error: firstKeyError,
          value: controlErrors[firstKeyError],
        });
      }
    });

    return result;
  }
}
