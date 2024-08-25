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
describe('dateTime', () => {
  it('should return the input date string if no format is provided', () => {
    const output = dateTime('2020-05-27T08:00:00.000Z');
    expect(output).toEqual('2020-05-27T08:00:00.000Z');
  });

  it('should return the formatted date string if format is provided', () => {
    const output = dateTime('2020-05-27T08:00:00.000Z', 'YYYY-MM-DD');
    expect(output).toEqual('2020-05-27');
  });

  it('should throw an error if the input date string is not in ISO8601 format', () => {
    expect(() => {
      dateTime('2020-105-27');
    }).toThrow();
  });

  it('should throw an error if the input date string is not a string', () => {
    expect(() => {
      dateTime(123);
    }).toThrow();
  });

  it('should throw an error if the format is not a string', () => {
    expect(() => {
      dateTime('2020-05-27T08:00:00.000Z', 123);
    }).toThrow();
  });
});
