import { AbstractControl, ValidationErrors } from '@angular/forms';
import moment from 'moment';

/** An actor's name can't match the given regular expression */
export function birthdateValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  const endDate = moment().subtract('18', 'year');
  const startDate = moment().subtract('108', 'year');
  const birthDate = moment(value);

  return birthDate.isBefore(endDate) && birthDate.isAfter(startDate)
    ? null
    : { invalid: true };
}
