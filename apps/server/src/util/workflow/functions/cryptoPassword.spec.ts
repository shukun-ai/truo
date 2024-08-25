import { cryptoPassword } from './cryptoPassword';

describe('cryptoPassword', () => {
  it('should return the hashed password', () => {
    const password = cryptoPassword('123456');
    expect(password).toEqual(
      '4ff1b5a2c4915baf130db8ab9690cd5bb32263911ec9f443a6b7df4604bc612453b419e6e9d1a78a921e468e5c60e5d536151c4d166c9a1ea46b5587ba1692a1',
    );
  });

  it('should throw an error if value is not a string', () => {
    expect(() => {
      cryptoPassword(123456);
    }).toThrow();
  });
});
