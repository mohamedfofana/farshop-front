import { AbstractControl, ValidationErrors } from '@angular/forms';
import moment, { Moment } from 'moment';
import { RegexPattern } from '../model/enum/regexPattern';

/** An actor's name can't match the given regular expression */
export function birthdateValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = <Moment> control.value;
  const endDate = moment().subtract('18', 'year');
  const startDate = moment().subtract('108', 'year');

  const error = { invalid: true };
  if (!(<Moment>value).isValid()) {
    return error;
  }


  return value.isBefore(endDate) && value.isAfter(startDate) ? null : error;
}
