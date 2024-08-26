import { cryptoPassword } from '../utils/password.utils';

describe('cryptoPassword', () => {
  it('should return a hashed password', () => {
    const password = 'myPassword123';
    const hashedPassword = cryptoPassword(password);

    expect(hashedPassword).toBeDefined();
    expect(hashedPassword).toEqual(
      '313ac754f0aa2456b26d21e9c8ee1f1ee723d800284cf9d7eab46040d6b85e20cbbeda07bea4dac795828d38a21d30eed4a957d5e00d4c3568de00f760a0e628',
    );
  });
});
