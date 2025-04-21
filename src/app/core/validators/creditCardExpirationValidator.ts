import { AbstractControl, ValidationErrors } from '@angular/forms';
import moment, { Moment } from 'moment';

export function creditCardExpirationValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = <Moment>control.value;
  const endDate = moment().add('5', 'year');
  const startDate = moment();

  const error = { invalid: true };
  if (!(<Moment>value).isValid()) {
    return error;
  }

  return value.isBefore(endDate) && value.isAfter(startDate) ? null : error;
}
