import { dateTime } from './dateTime';

describe('dateTime', () => {
  it('dateTime', () => {
    const output = dateTime('2020-05-27T08:00:00.000Z');
    expect(output).toEqual('2020-05-27T08:00:00.000Z');
  });

  it('dateTime with format', () => {
    const output = dateTime('2020-05-27T08:00:00.000Z', 'YYYY-MM-DD');
    expect(output).toEqual('2020-05-27');
  });

  it('dateTime without iso input', () => {
    expect(() => {
      dateTime('2020-105-27');
    }).toThrow();
  });
});
