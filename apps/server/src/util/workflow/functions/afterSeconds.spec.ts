import MockDate from 'mockdate';

import { afterSeconds } from './afterSeconds';

beforeEach(() => {
  MockDate.set(new Date('2020-05-27T08:00:00.000Z'));
});

describe('afterSeconds', () => {
  it('afterSeconds', () => {
    const dateTime = afterSeconds(60);
    expect(dateTime).toEqual('2020-05-27T08:01:00.000Z');
  });
});
