import Validator from '../index.js';

test('test strings', () => {
    const v = new Validator();

    const schema = v.string();

    expect(schema.isValid('')).toBe(true); // true
    expect(schema.isValid(null)).toBe(true) // true
    expect(schema.isValid(undefined)).toBe(true) // true

    schema.required();

    expect(schema.isValid('what does the fox say')).toBe(true); // true
    expect(schema.isValid('hexlet')).toBe(true); // true
    expect(schema.isValid(null)).toBe(false); // false
    expect(schema.isValid('')).toBe(false); // false

    expect(schema.minLength(4).isValid('1234')).toBe(true);
    expect(schema.minLength(4).isValid('123')).toBe(false);

    expect(schema.contains('what').isValid('what does the fox say')).toBe(true); // true
    expect(schema.contains('whatthe').isValid('what does the fox say')).toBe(false); // false
})

test('test numbers', () => {
    const v = new Validator();

    const schema = v.number();

    expect(schema.isValid(null)).toBe(true);

    schema.required();
    expect(schema.isValid(null)).toBe(false);
    expect(schema.isValid(7)).toBe(true);

    expect(schema.positive().isValid(10)).toBe(true);

    schema.range(-5, 5);
    expect(schema.isValid(-3)).toBe(false);
    expect(schema.isValid(5)).toBe(true);
})

