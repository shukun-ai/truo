import { JsonTemplate } from './JsonTemplate';

describe('JsonTemplate.spec.ts', () => {
  let jsonTemplate: JsonTemplate;

  beforeAll(() => {
    jsonTemplate = new JsonTemplate('States', {
      secret: (value) => {
        return value;
      },
    });
  });

  it('compile simple', () => {
    const origin = {
      name: 'div',
      count: '10',
      hi: 'hello',
    };

    const expected = {
      name: 'div',
      count: '10',
      hi: 'hello',
    };

    const output = jsonTemplate.compile(origin);
    expect(output).toEqual(expected);
  });

  it('compile string function', () => {
    const origin = {
      name: "States.secret('div')",
      count: '10',
      hi: 'hello',
    };

    const expected = {
      name: 'div',
      count: '10',
      hi: 'hello',
    };

    const output = jsonTemplate.compile(origin);
    expect(output).toEqual(expected);
  });

  it('compile complex', () => {
    const origin = {
      name: 'help',
      count: 10,
      children: [
        {
          name: 'div',
          count: '10',
          extra: {
            hi: 'hello',
          },
        },
      ],
    };

    const expected = {
      name: 'help',
      count: 10,
      children: [
        {
          name: 'div',
          count: '10',
          extra: {
            hi: 'hello',
          },
        },
      ],
    };

    const output = jsonTemplate.compile(origin);

    expect(output).toEqual(expected);
  });
});
