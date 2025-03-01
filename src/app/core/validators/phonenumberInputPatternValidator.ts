import { AbstractControl, ValidationErrors } from '@angular/forms';
import { RegexPattern } from '../model/enum/regexPattern';

/** An actor's name can't match the given regular expression */
export function phonenumberInputPatternValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  const regex = new RegExp(RegexPattern.PHONENUMBER);

  return regex.test(value) ? null : { invalid: true };
}
