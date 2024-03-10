class BasicValidator {
  constructor() {
    this.validationFuncs = [];
  }

  addValidator(validationFunc) {
    this.validationFuncs.push(validationFunc);
    return this;
  }

  isValid(value) {
    return this.validationFuncs
      .every((validationFunc) => validationFunc(value));
  }
}

class StringValidator extends BasicValidator {
  required() {
    const requiredCheck = (val) => !!val && typeof val === 'string';
    return this.addValidator(requiredCheck)
  }

  contains(string) {
    const containsCheck = (val) => val.includes(string);
    return this.addValidator(containsCheck)
  }

  minLength(length) {
    const minLengthCheck = (val) => val.length >= length;
    return this.addValidator(minLengthCheck)
  }
}

class NumberValidator extends BasicValidator {
  required() {
    const requiredCheck = (val) => typeof val === 'number';
    return this.addValidator(requiredCheck);
  }

  positive() {
    const positiveCheck = (val) => val > 0;
    return this.addValidator(positiveCheck);
  }

  range(rangeStart, rangeEnd) {
    const rangeCheck = (val) => (val >= rangeStart && val <= rangeEnd);
    return this.addValidator(rangeCheck)
  }
}

export default class Validator {
  string() {
    this.validator = new StringValidator();
    return this.validator;
  }

  number() {
    this.validator = new NumberValidator();
    return this.validator;
  }
}

