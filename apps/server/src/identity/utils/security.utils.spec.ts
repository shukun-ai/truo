import { parseToken } from './security.utils';

describe('gateway.utils', () => {
  it('parseToken normal', async () => {
    const token = parseToken('Bearer this_is_a_example_token.with_dot');

    expect(token).toEqual('this_is_a_example_token.with_dot');
  });

  it('parseToken undefined', async () => {
    const token = parseToken(undefined);

    expect(token).toEqual(null);
  });

  it('parseToken empty', async () => {
    const token = parseToken('Bearer ');

    expect(token).toEqual(null);
  });
});
