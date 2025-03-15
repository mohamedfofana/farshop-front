import { AbstractControl, ValidationErrors } from '@angular/forms';
import { RegexPattern } from '../model/enum/regexPattern';

export function nameInputPatternValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  const regex = new RegExp(RegexPattern.NAME);

  return regex.test(value) ? null : { invalid: true };
}
