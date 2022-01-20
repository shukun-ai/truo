import { tokenization } from './Tokenization';

describe('Tokenization.spec.ts', () => {
  it('tokenization', () => {
    const formula = `scope.secret('HOME_PAGE false', 30, false, null)`;
    const output = tokenization(formula);
    expect(output).toEqual({
      scopeName: 'scope',
      methodName: 'secret',
      arguments: ['HOME_PAGE false', 30, false, null],
    });
  });

  it('tokenization', () => {
    const formula = `scope('HOME_PAGE false', 30, false)`;
    expect(() => {
      tokenization(formula);
    }).toThrowError(
      'The first keyword is not function, for example use States.secret.',
    );
  });
});
