import { NoChoiceMatched } from '../errors/NoChoiceMatched';

import { compareVariables } from './comparisons';

describe('ss', () => {
  it('compareVariables simple', () => {
    const comparisons = {
      variable: 'isSystem',
      booleanEquals: true,
    };

    const input = {
      isSystem: true,
    };

    const output = compareVariables(comparisons, input);
    expect(output).toEqual(true);
  });

  it('compareVariables and', () => {
    const comparisons = {
      and: [
        {
          variable: 'isSystem',
          booleanEquals: true,
        },
        {
          variable: 'isGenerated',
          booleanEquals: false,
        },
      ],
    };

    const input = {
      isSystem: true,
    };

    const output = compareVariables(comparisons, input);
    expect(output).toEqual(false);
  });

  it('compareVariables or', () => {
    const comparisons = {
      or: [
        {
          variable: 'isSystem',
          booleanEquals: true,
        },
        {
          variable: 'isGenerated',
          booleanEquals: false,
        },
      ],
    };

    const input = {
      isSystem: true,
    };

    const output = compareVariables(comparisons, input);
    expect(output).toEqual(true);
  });

  it('compareVariables not', () => {
    const comparisons = {
      not: {
        variable: 'isSystem',
        booleanEquals: true,
      },
    };

    const input = {
      isSystem: true,
    };

    const output = compareVariables(comparisons, input);
    expect(output).toEqual(false);
  });

  it('compareVariables only variable', () => {
    const comparisons = {
      not: {
        variable: 'isSystem',
      },
    };

    const input = {
      isSystem: true,
    };

    expect(() => compareVariables(comparisons, input)).toThrowError(
      NoChoiceMatched,
    );
  });

  it('compareVariables no variable', () => {
    const comparisons = {
      not: {
        booleanEquals: true,
      },
    };

    const input = {
      isSystem: true,
    };

    expect(() => compareVariables(comparisons, input)).toThrowError(
      NoChoiceMatched,
    );
  });

  it('compareVariables did not find specific function', () => {
    const comparisons = {
      not: {
        variable: 'isSystem',
        booleanEquals2: true,
      },
    };

    const input = {
      isSystem: true,
    };

    expect(() => compareVariables(comparisons, input)).toThrowError(
      NoChoiceMatched,
    );
  });

  it('compareVariables did not find specific function', () => {
    const comparisons = {
      not: {
        variable: 'isSystem',
        booleanEquals2: true,
      },
    };

    const input = {
      isSystem: true,
    };

    expect(() => compareVariables(comparisons, input)).toThrowError(
      NoChoiceMatched,
    );
  });

  it('compareVariables parse path', () => {
    const comparisons = {
      variable: 'isSystem',
      booleanEqualsPath: '$.isOther',
    };

    const input = {
      isSystem: true,
      isOther: true,
    };

    const output = compareVariables(comparisons, input);
    expect(output).toEqual(true);
  });

  it('compareVariables parse path', () => {
    const comparisons = {
      variable: 'isSystem',
      th: '$.isOther',
    };

    const input = {
      isSystem: true,
      isOther: true,
    };

    expect(() => compareVariables(comparisons, input)).toThrow(NoChoiceMatched);
  });

  it('compareVariables throws error when no comparison variable', () => {
    const comparisons = {
      variable: 'isSystem',
      booleanEqualsPath: false as any,
    };

    const input = {
      isSystem: true,
      isOther: true,
    };

    expect(() => compareVariables(comparisons, input)).toThrowError(
      NoChoiceMatched,
    );
  });
});
