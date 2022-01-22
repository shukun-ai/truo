import { isSameDomain } from './urlHelper';

describe('url-helpers', () => {
  it('isSameDomain', async () => {
    expect(
      isSameDomain('http://www.test1.com', 'http://doc.test1.com'),
    ).toBeTruthy();
    expect(
      isSameDomain('http://www.test1.com', 'http://www.test2.com'),
    ).toBeFalsy();
    expect(
      isSameDomain('https://www.test1.com', 'http://doc.test1.com'),
    ).toBeTruthy();
    expect(
      isSameDomain('https://www.test1.com', 'http://www.test2.com'),
    ).toBeFalsy();
    expect(isSameDomain('www.test1.com', 'doc.test1.com')).toBeTruthy();
    expect(isSameDomain('www.test1.com', 'www.test2.com')).toBeFalsy();
    expect(isSameDomain('a', 'www.test2.com')).toBeFalsy();
    expect(isSameDomain('www.test1.com', 'b')).toBeFalsy();
  });
});
