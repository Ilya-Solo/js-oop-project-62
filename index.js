class BasicValidator {
  constructor() {
    this.validationFuncs = [];
  }

  addDefaultValidator(validationFunc) {
    this.validationFuncs.push(validationFunc);
    return this;
  }

  test(funcName, ...args) {
    const cutomFunc = (val) => this.testValidationFuncs[funcName](val, ...args);
    return this.addDefaultValidator(cutomFunc);
  }

  isValid(value) {
    if (!this.requiredCalled && !value) return true;

    return this.validationFuncs
      .every((validationFunc) => validationFunc(value));
  }
}

class StringValidator extends BasicValidator {
  required() {
    const requiredCheck = (val) => !!val && typeof val === 'string';
    this.requiredCalled = true;
    return this.addDefaultValidator(requiredCheck);
  }

  contains(string) {
    const containsCheck = (val) => val.includes(string);
    return this.addDefaultValidator(containsCheck);
  }

  minLength(length) {
    const minLengthCheck = (val) => val.length >= length;
    return this.addDefaultValidator(minLengthCheck);
  }
}

class NumberValidator extends BasicValidator {
  required() {
    const requiredCheck = (val) => typeof val === 'number';
    this.requiredCalled = true;
    return this.addDefaultValidator(requiredCheck);
  }

  positive() {
    const positiveCheck = (val) => val > 0;
    return this.addDefaultValidator(positiveCheck);
  }

  range(rangeStart, rangeEnd) {
    const rangeCheck = (val) => (val >= rangeStart && val <= rangeEnd);
    return this.addDefaultValidator(rangeCheck);
  }
}

class ArrayValidator extends BasicValidator {
  required() {
    const requiredCheck = (val) => Array.isArray(val);
    this.requiredCalled = true;
    return this.addDefaultValidator(requiredCheck);
  }

  sizeof(length) {
    const sizeOfArrayCheck = (val) => val.length === length;
    return this.addDefaultValidator(sizeOfArrayCheck);
  }
}

class HashValidator extends BasicValidator {
  shape(hash) {
    const shapeChk = (val) => Object.entries(hash).every(([key, value]) => value.isValid(val[key]));

    this.requiredCalled = true;
    return this.addDefaultValidator(shapeChk);
  }
}

const validatorClassesMapping = {
  string: StringValidator,
  number: NumberValidator,
  array: ArrayValidator,
  hash: HashValidator,
};

export default class Validator {
  constructor() {
    Object.keys(validatorClassesMapping).forEach((key) => {
      this[`type${key}`] = { customValidators: {} };
    });
  }

  addValidator(type, name, fn) {
    this[`type${type}`].customValidators[name] = fn;
  }

  string() {
    const validator = new StringValidator();
    validator.testValidationFuncs = this.typestring.customValidators;
    return validator;
  }

  number() {
    const validator = new NumberValidator();
    validator.testValidationFuncs = this.typenumber.customValidators;
    return validator;
  }

  array() {
    const validator = new ArrayValidator();
    validator.testValidationFuncs = this.typearray.customValidators;
    return validator;
  }

  object() {
    const validator = new HashValidator();
    validator.testValidationFuncs = this.typehash.customValidators;
    return validator;
  }
}
