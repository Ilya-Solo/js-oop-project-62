class BasicValidator {
  constructor() {
    this.validationFuncs = [];
  }

  addValidator(validationFunc) {
    this.validationFuncs.push(validationFunc);
    return this;
  }

  isValid(value) {
    if(!this.requiredCalled && !value) return true;

    return this.validationFuncs
      .every((validationFunc) => validationFunc(value));
  }
}

class StringValidator extends BasicValidator {
  required() {
    const requiredCheck = (val) => !!val && typeof val === 'string';
    this.requiredCalled = true;
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
    this.requiredCalled = true;
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

class ArrayValidator extends BasicValidator {
  required() {
    const requiredCheck = (val) => Array.isArray(val);
    this.requiredCalled = true;
    return this.addValidator(requiredCheck)
  }

  sizeof(length) {
    const sizeOfArrayCheck = (val) => val.length === length;
    return this.addValidator(sizeOfArrayCheck)
  }
}

class HashValidator extends BasicValidator {
  shape(hash) {
    const shapeCheck = (val) => {
      const recursiveShapeCheck = (checkedValue, shapeForm) => {
        return Object.entries(shapeForm).every(([key, value]) => {
          if (value.constructor === Object) {
            return shapeCheck(checkedValue[key], shapeForm[key])
          }

          return value.isValid(checkedValue[key]);
        })
      }

      return recursiveShapeCheck(val, hash)
    }

    this.requiredCalled = true;
    return this.addValidator(shapeCheck);
  }
}

export default class Validator {
  string() {
    return new StringValidator();
  }

  number() {
    return new NumberValidator();
  }

  array() {
    return new ArrayValidator();
  }

  object() {
    return new HashValidator();
  }
}

