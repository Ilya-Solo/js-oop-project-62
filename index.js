export default class Validator {
  constructor() {
    this.validators = [];
  }

  string() {
    this.type = 'string';
    return this;
  }

  required() {
    const requiredCheck = (val) => !!val;

    this.validators.push(requiredCheck);
    return this;
  }

  contains(string) {
    const containsCheck = (val) => val.includes(string);

    this.validators.push(containsCheck);
    return this;
  }

  minLength(length) {
    const minLengthCheck = (val) => val.length >= length;

    this.validators.push(minLengthCheck);
    return this;
  }

  isValid(value) {
    return this.validators
      .every((validator) => validator(value));
  }

}