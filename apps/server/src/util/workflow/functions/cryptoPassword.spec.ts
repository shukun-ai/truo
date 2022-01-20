import { cryptoPassword } from './cryptoPassword';

describe('cryptoPassword', () => {
  it('cryptoPassword', () => {
    const password = cryptoPassword('123456');
    expect(password).toEqual(
      '28a667e7dd74f7322098fbcc98e63532355b6877d3488f2ca73d5538381071a704fc9679b5c11df81a00e299a90917622554029e60496309dea3c30f1b464ba7',
    );
  });
});
