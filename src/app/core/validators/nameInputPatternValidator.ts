import { AbstractControl, ValidationErrors } from '@angular/forms';
import { RegexPattern } from '../model/enum/regexPattern';

/** An actor's name can't match the given regular expression */
export function nameInputPatternValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  const regex = new RegExp(RegexPattern.NAME);
  
  return regex.test(value) ? null : { invalid: true };
}
