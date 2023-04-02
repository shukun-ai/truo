import { join } from 'path';

import { PresenterGenerator } from './presenter-generator';

describe('Generate', () => {
  it('generate', async () => {
    const presenterGenerator = new PresenterGenerator();
    const output = await presenterGenerator.generate({
      inputPath: join(__dirname, '../__mock__/input'),
    });

    expect(JSON.parse(output)).toEqual({
      presenters: {
        pda: {
          title: 'PDA',
          containers: {
            home: {
              type: 'page',
              repositories: {
                form1: {
                  type: 'Simple',
                },
              },
              widgets: {
                w1: {
                  tag: 'sk-text',
                  properties: {
                    value: '{{$.form1.deviceNumber}}',
                  },
                  events: {},
                },
                w2: {
                  tag: 'sk-input',
                  properties: {
                    value: '{{$.form1.deviceNumber}}',
                  },
                  events: {
                    'value-changed': [
                      {
                        action: 'setRepository',
                        target: 'form1',
                        path: ['deviceNumber'],
                      },
                    ],
                  },
                },
                w3: {
                  tag: 'sk-code',
                  properties: {
                    value: '{{$.form1}}',
                  },
                  events: {},
                },
              },
              root: ['w1', 'w2', 'w3'],
              tree: {},
            },
            about: {
              type: 'page',
              repositories: {
                form2: {
                  type: 'Simple',
                },
              },
              widgets: {
                w1: {
                  tag: 'sk-text',
                  properties: {
                    value: 'It is about page {{$.form2.value}}.',
                  },
                  events: {},
                },
              },
              root: ['w1'],
              tree: {},
            },
          },
          screens: {},
        },
      },
    });
  });
});
