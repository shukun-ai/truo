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
