import { verifyCode } from './verifyCode';

describe('verifyCode', () => {
  it('verifyCode', () => {
    const code = verifyCode(4);
    expect(code.length).toEqual(4);
  });
});
