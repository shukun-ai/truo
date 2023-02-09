import { isDateTimeIso } from './is-date-time-iso';
describe('isDateTimeIso', () => {
  it('Should return false, when the value is undefined', () => {
    const output = isDateTimeIso(undefined);
    expect(output).toEqual(false);
  });

  it('Should return false, when the value is null', () => {
    const output = isDateTimeIso(null);
    expect(output).toEqual(false);
  });

  it('Should return false, when the value is 0', () => {
    const output = isDateTimeIso(0);
    expect(output).toEqual(false);
  });

  it('Should return false, when the value is empty string', () => {
    const output = isDateTimeIso('');
    expect(output).toEqual(false);
  });

  it('Should return false, when the value is string', () => {
    const output = isDateTimeIso('hello');
    expect(output).toEqual(false);
  });

  it('Should return true, when the value is a iso date.', () => {
    const output = isDateTimeIso('2023-01-08T03:21:47.392Z');
    expect(output).toEqual(true);
  });

  it('Should return false, when the value is not a strict iso date.', () => {
    const output = isDateTimeIso('2020-02-29 14:39:00');
    expect(output).toEqual(false);
  });

  it('Should return true, when the value is a strict iso date with timezone.', () => {
    const output = isDateTimeIso('2023-01-08T03:21:47.392+08:00');
    expect(output).toEqual(true);
  });

  it('Should return false, when the value is date string.', () => {
    const output = isDateTimeIso(
      'Sun Jan 08 2023 12:53:21 GMT+0800 (China Standard Time)',
    );
    expect(output).toEqual(false);
  });
});
