import { IntrinsicFailure } from '../errors/IntrinsicFailure';

import { convertToAst, matchArgs } from './convert';

describe('functions', () => {
  it('parseFunction', () => {
    const json = {
      name: 'Lee',
    };

    // Now, we can't support comma within single quotes. Should change regexp to implement it later.
    const ast = convertToAst(
      `States.format('Your name is {} we are in the year {}', $.name, 2020)`,
      json,
    );

    expect(ast).toEqual({
      method: 'States.format',
      args: ['Your name is {} we are in the year {}', 'Lee', 2020],
    });
  });

  it('Not match', () => {
    const json = {
      name: 'Lee',
    };

    expect(() =>
      convertToAst(
        `State.format('Your name is {} we are in the year {}', $.name, 2020)`,
        json,
      ),
    ).toThrow(IntrinsicFailure);
  });

  it('matchArgs without args', () => {
    const args = matchArgs('State.now()', {});
    expect(args).toEqual([]);
  });

  it('matchArgs not matched', () => {
    const args = () => matchArgs('State.now((', {});
    expect(args).toThrow(IntrinsicFailure);
  });

  it('matchArgs with a arg', () => {
    const args = matchArgs(`State.now('YYYY-MM-dd')`, {});
    expect(args).toEqual(['YYYY-MM-dd']);
  });

  it('matchArgs return null', () => {
    const args = matchArgs('State.now(null)', {});
    expect(args).toEqual([null]);
  });

  it('matchArgs throw error when arg is object', () => {
    const args = () => matchArgs('State.now({})', {});
    expect(args).toThrow(IntrinsicFailure);
  });
});
