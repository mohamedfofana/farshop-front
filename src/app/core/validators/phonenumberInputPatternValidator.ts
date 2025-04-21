import { AbstractControl, ValidationErrors } from '@angular/forms';
import { RegexPattern } from '../model/enum/regexPattern';

export function phonenumberInputPatternValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  const regex = new RegExp(RegexPattern.PHONENUMBER);

  return regex.test(value) ? null : { invalid: true };
}
