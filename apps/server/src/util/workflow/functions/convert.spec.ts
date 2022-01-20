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

  it('matchArgs without args', () => {
    const args = matchArgs('State.now()', {});
    expect(args).toEqual([]);
  });

  it('matchArgs with a arg', () => {
    const args = matchArgs(`State.now('YYYY-MM-dd')`, {});
    expect(args).toEqual(['YYYY-MM-dd']);
  });
});
