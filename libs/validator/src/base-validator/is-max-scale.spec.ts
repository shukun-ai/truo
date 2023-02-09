import { isMaxScale } from './is-max-scale';

describe('isMaxScale', () => {
  it('should false, when value is string.', () => {
    const output = isMaxScale('Hello', 10);
    expect(output).toEqual(false);
  });

  it('should false, when value is integer.', () => {
    const output = isMaxScale(10, 10);
    expect(output).toEqual(false);
  });

  it('should false, when value is less than scale.', () => {
    const output = isMaxScale(10.01, 2);
    expect(output).toEqual(false);
  });

  it('should true, when value is greater than scale.', () => {
    const output = isMaxScale(10.0111, 2);
    expect(output).toEqual(true);
  });
});
