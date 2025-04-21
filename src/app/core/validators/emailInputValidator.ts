import { AbstractControl, ValidationErrors } from '@angular/forms';
import { RegexPattern } from '../model/enum/regexPattern';

export function emailInputValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  const regex = new RegExp(RegexPattern.EMAIL);
  return regex.test(value) ? null : { invalid: true };
}
