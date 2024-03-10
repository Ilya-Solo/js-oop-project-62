import Validator from '../index.js';

test('test strings', () => {
    const v = new Validator();

    const schema = v.string();

    expect(schema.isValid('')).toEqual(true); // true
    expect(schema.isValid(null)).toEqual(true) // true
    expect(schema.isValid(undefined)).toEqual(true) // true

    schema.required();

    expect(schema.isValid('what does the fox say')).toEqual(true); // true
    expect(schema.isValid('hexlet')).toEqual(true); // true
    expect(schema.isValid(null)).toEqual(false); // false
    expect(schema.isValid('')).toEqual(false); // false

    expect(schema.minLength(4).isValid('1234')).toEqual(true);
    expect(schema.minLength(4).isValid('123')).toEqual(false);

    expect(schema.contains('what').isValid('what does the fox say')).toEqual(true); // true
    expect(schema.contains('whatthe').isValid('what does the fox say')).toEqual(false); // false
}) 