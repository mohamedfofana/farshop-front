export enum RegexPattern {
  NAME = "^[a-zA-Z]+(?:[-' ][a-zA-Z]+)*$",
  EMAIL = '^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$',
  NUMBER = '^d+$',
  PHONENUMBER = '^[1-9][0-9]{9}$',
  DATE = '^(\\d{4})-(0[1-9]|1[0-2]|[1-9])-([1-9]|0[1-9]|[1-2]\\d|3[0-1])$',
}
