import { WorkflowCatches, WorkflowTaskState } from '@shukun/schema';

import { ParameterPathFailure } from './errors/ParameterPathFailure';
import {
  parseTemplateFromJson,
  parseByAllInput,
  parseByAllOutput,
  parseByInputPath,
  parseByParameters,
  parseByResultPath,
  handleCatch,
  wrapCatchError,
} from './parser';
import { InputOrOutput } from './types';

describe('parser', () => {
  const json = {
    movies: [
      {
        genre: 'crime',
        director: 'Quentin Tarantino',
        title: 'Reservoir Dogs',
        year: 1992,
      },
      {
        genre: 'action',
        director: 'Brian De Palma',
        title: 'Mission: Impossible',
        year: 1996,
        staring: ['Tom Cruise'],
      },
    ],
    metadata: {
      lastUpdated: '2020-05-27T08:00:00.000Z',
    },
  };

  it('Simple parseTemplateFromJson', () => {
    const parameters = {
      'uu.$': '$.movies[0]',
    };

    const expectedOutput = {
      uu: {
        genre: 'crime',
        director: 'Quentin Tarantino',
        title: 'Reservoir Dogs',
        year: 1992,
      },
    };

    const output = parseTemplateFromJson(parameters, json, false);

    expect(output).toEqual(expectedOutput);
  });

  it('Complex parseTemplateFromJson', () => {
    const parameters = {
      staticValue: 'Just a string',
      catalog: {
        'myFavoriteMovie.$': '$.movies[0]',
      },
      'cats.$': [
        'nihao',
        {
          'i.$': '$.movies[0]',
        },
      ],
      'uu.$': '$.movies[0]',
    };

    const expectedOutput = {
      staticValue: 'Just a string',
      catalog: {
        myFavoriteMovie: {
          genre: 'crime',
          director: 'Quentin Tarantino',
          title: 'Reservoir Dogs',
          year: 1992,
        },
      },
      cats: [
        'nihao',
        {
          i: {
            genre: 'crime',
            director: 'Quentin Tarantino',
            title: 'Reservoir Dogs',
            year: 1992,
          },
        },
      ],
      uu: {
        genre: 'crime',
        director: 'Quentin Tarantino',
        title: 'Reservoir Dogs',
        year: 1992,
      },
    };

    const output = parseTemplateFromJson(parameters, json, false);

    expect(output).toEqual(expectedOutput);
  });

  it('Complex parseTemplateFromJson width _$.exists', () => {
    const parameters = {
      atomName: 'verify_codes',
      query: {
        filter: {
          'email.$': '$.movies[0].genre',
          usedAt: {
            '_$exists.$': false,
          },
          expiredAt: {
            '_$gt.$': `States.dateTime('2021-09-11T16:00:00.000Z')`,
          },
        },
      },
    };

    const expectedOutput = {
      atomName: 'verify_codes',
      query: {
        filter: {
          email: 'crime',
          usedAt: {
            $exists: false,
          },
          expiredAt: {
            $gt: '2021-09-11T16:00:00.000Z',
          },
        },
      },
    };

    const output = parseTemplateFromJson(parameters, json, false);

    expect(output).toEqual(expectedOutput);
  });

  it('parseByAllInput', () => {
    const inputPath = '$.body';

    const parameters = {
      resource: 'system__users',
      'name.$': '$.name',
      'label.$': '$.label',
    };

    const input = {
      body: {
        name: 'hi',
        label: '你好',
      },
    };

    const output = parseByAllInput(input, inputPath, parameters);

    expect(output).toEqual({
      resource: 'system__users',
      name: 'hi',
      label: '你好',
    });
  });

  it('parseByAllOutput', () => {
    const input = {
      body: {
        name: 'hi',
        label: '你好',
      },
    };

    const result = {
      value: {
        mongoCredential: {
          username: 'root',
          password: 'root',
        },
      },
    };

    const resultSelector = {
      'username.$': '$.value.mongoCredential.username',
      'password.$': '$.value.mongoCredential.password',
    };

    const resultPath = '$.mongoCredential';

    const outputPath = '$';

    const output = parseByAllOutput(
      input,
      result,
      resultSelector,
      resultPath,
      outputPath,
    );

    expect(output).toEqual({
      body: {
        name: 'hi',
        label: '你好',
      },
      mongoCredential: {
        username: 'root',
        password: 'root',
      },
    });
  });

  it('parseByAllOutput2', () => {
    const input = {
      body: 'Hello Worlds',
      headers: {
        test: true,
      },
    };
    const result = {};
    const resultSelector = undefined;
    const resultPath = '$.users';
    const outputPath = undefined;

    const output = parseByAllOutput(
      input,
      result,
      resultSelector,
      resultPath,
      outputPath,
    );

    expect(output).toEqual({
      ...input,
      users: {},
    });
  });

  it('parseByInputPath should be input, when the inputPath is undefined.', () => {
    const input = {
      title: 'Hi',
    };
    const inputPath = undefined;
    const result = parseByInputPath(input, inputPath);
    expect(result).toEqual(input);
  });

  it('parseByInputPath should be `Hi`, when the inputPath is $.title.', () => {
    const input = {
      title: 'Hi',
    };
    const inputPath = '$.title';
    const result = parseByInputPath(input, inputPath);
    expect(result).toEqual('Hi');
  });

  it('parseByInputPath should throw Error, when the inputPath is 0 or other invalid string.', () => {
    const input = {
      title: 'Hi',
    };
    const inputPath = 't';
    const result = parseByInputPath(input, inputPath);
    expect(result).toEqual({});
  });

  it('parseByParameters should be input, when the parameters is undefined.', () => {
    const input = {
      title: 'Hi',
    };
    const parameters = undefined;
    const result = parseByParameters(input, parameters);
    expect(result).toEqual(input);
  });

  it('parseByParameters should be `Hi`, when the parameters is $.title.', () => {
    const input = {
      title: 'Hi',
    };
    const parameters = {
      'arg.$': '$.title',
    };
    const result = parseByParameters(input, parameters);
    expect(result).toEqual({ arg: 'Hi' });
  });

  it('parseByParameters should throw Error, when the parameters are not a object.', () => {
    const input = {
      title: 'Hi',
    };
    const parameters = () => {};
    expect(() => parseByParameters(input, parameters as any)).toThrow(
      ParameterPathFailure,
    );
  });

  it('parseByResultPath should be input, when the resultPath is undefined.', () => {
    const origin = {
      who: 'origin',
    };
    const input = {
      title: 'Hi',
    };
    const resultPath = undefined;
    const result = parseByResultPath(origin, input, resultPath);
    expect(result).toEqual(origin);
  });

  it('parseByResultPath should be input, when the resultPath is $.', () => {
    const origin = {
      who: 'origin',
    };
    const input = {
      title: 'Hi',
    };
    const resultPath = '$';
    const result = parseByResultPath(origin, input, resultPath);
    expect(result).toEqual(origin);
  });

  it('parseByResultPath should append to origin, when the resultPath is `$.appended`.', () => {
    const origin = {
      who: 'origin',
    };
    const input = {
      title: 'Hi',
    };
    const resultPath = '$.appended';
    const result = parseByResultPath(origin, input, resultPath);
    expect(result).toEqual({
      ...origin,
      appended: input,
    });
  });

  it('parseByResultPath should append to origin deeply, when the resultPath is `$.appended.suffix`.', () => {
    const origin = {
      who: 'origin',
    };
    const input = {
      title: 'Hi',
    };
    const resultPath = '$.appended.suffix';
    const result = parseByResultPath(origin, input, resultPath);
    expect(result).toEqual({
      ...origin,
      appended: {
        suffix: input,
      },
    });
  });

  it('parseByResultPath should instead origin, when the resultPath is `$.who`.', () => {
    const origin = {
      who: 'origin',
    };
    const input = {
      title: 'Hi',
    };
    const resultPath = '$.who';
    const result = parseByResultPath(origin, input, resultPath);
    expect(result).toEqual({
      who: {
        title: 'Hi',
      },
    });
  });

  it('wrapCatchError should return computed result and exception result.', async () => {
    const state: WorkflowTaskState = {
      type: 'Task',
      resource: 'source:findOne',
      parameters: {},
      next: 'SecondTask',
    };

    const inputParameters = {
      title: 'hi',
    };

    const resourceInstance = (
      parameters: InputOrOutput,
    ): Promise<InputOrOutput> => {
      return new Promise((resolve) => {
        resolve({
          test: 'hi',
          parameters,
        });
      });
    };

    const output = await wrapCatchError(
      state,
      inputParameters,
      resourceInstance,
    );

    expect(output).toEqual({
      end: undefined,
      next: 'SecondTask',
      output: {
        test: 'hi',
        parameters: inputParameters,
      },
    });

    const state2: WorkflowTaskState = {
      type: 'Task',
      resource: 'source:findOne',
      parameters: {},
    };

    const output2 = await wrapCatchError(
      state2,
      inputParameters,
      resourceInstance,
    );

    expect(output2).toEqual({
      end: true,
      output: undefined,
    });
  });

  it('handleCatch', () => {
    const error = new ParameterPathFailure();
    const catchDefinitions: WorkflowCatches = [
      {
        errorEquals: ['States.ParameterPathFailure'],
        next: 'Third',
      },
    ];
    const output = handleCatch(error, catchDefinitions);

    expect(output).toEqual({
      next: 'Third',
      output: undefined,
    });
  });
});
