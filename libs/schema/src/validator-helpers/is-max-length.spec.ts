import { isMaxLength } from './is-max-length';

describe('isMaxLength', () => {
  it('When value is string.', () => {
    const value = 'Hello';
    const output = isMaxLength(value, 1000);
    expect(output).toEqual(false);
  });

  describe('When value is too long string.', () => {
    const value = new Array(200)
      .fill(1)
      .reduce((previous) => (previous += 'Hello'), 's');
    const output = isMaxLength(value, 1000);
    expect(output).toEqual(true);
  });

  describe('When value is undefined.', () => {
    const value = undefined;
    const output = isMaxLength(value, 1000);
    expect(output).toEqual(false);
  });

  describe('When value is null.', () => {
    const value = null;
    const output = isMaxLength(value, 1000);
    expect(output).toEqual(false);
  });

  describe('When value is number.', () => {
    const value = 5;
    const output = isMaxLength(value, 1000);
    expect(output).toEqual(false);
  });

  describe('When value is boolean.', () => {
    const value = false;
    const output = isMaxLength(value, 1000);
    expect(output).toEqual(false);
  });
});
