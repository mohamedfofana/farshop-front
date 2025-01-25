import { AbstractControl, ValidationErrors } from '@angular/forms';
import { RegexPattern } from '../model/enum/regexPattern';

/** An actor's name can't match the given regular expression */
export function emailInputValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  const regex = new RegExp(RegexPattern.EMAIL);
  return regex.test(value) ? null : { invalid: true };
}
