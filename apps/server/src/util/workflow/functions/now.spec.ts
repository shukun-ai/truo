import dayjs from 'dayjs';
import MockDate from 'mockdate';

import { now } from './now';

beforeEach(() => {
  MockDate.set(new Date('2020-05-27T08:00:00.000Z'));
});

describe('now', () => {
  it('now', () => {
    const dateTime = now();
    expect(dateTime).toEqual('2020-05-27T08:00:00.000Z');
  });

  it('now with format', () => {
    const dateTime = now('YYYY-MM-DD');
    expect(dateTime).toEqual('2020-05-27');
  });
});
describe('now', () => {
  it('returns the current date and time in ISO format when no format is provided', () => {
    const mockDate = new Date('2020-05-27T08:00:00.000Z');
    jest
      .spyOn(dayjs.prototype, 'toISOString')
      .mockReturnValue(mockDate.toISOString());

    const result = now();

    expect(result).toEqual(mockDate.toISOString());
  });

  it('returns the current date and time formatted according to the provided format', () => {
    const mockDate = dayjs('2020-05-27T08:00:00.000Z');
    const format = 'YYYY-MM-DD';
    jest
      .spyOn(dayjs.prototype, 'format')
      .mockReturnValue(mockDate.format(format));

    const result = now(format);

    expect(result).toEqual(mockDate.format(format));
  });

  it('throws an error when an invalid format is provided', () => {
    const invalidFormat = 123;

    expect(() => {
      now(invalidFormat);
    }).toThrow();
  });
});
