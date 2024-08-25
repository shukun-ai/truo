import { verifyCode } from './verifyCode';

describe('verifyCode', () => {
  it('verifyCode', () => {
    const code = verifyCode(4);
    expect(code.length).toEqual(4);
  });
});
describe('verifyCode', () => {
  it('should generate a code of the specified length', () => {
    const length = 4;
    const code = verifyCode(length);
    expect(code.length).toEqual(length);
  });

  it('should throw an error if length is not a number', () => {
    const length = 'invalid';
    expect(() => verifyCode(length)).toThrowError(
      'Must give verifyCode a numeric argument.',
    );
  });
});
