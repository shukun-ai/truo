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
          label: 'PDA',
          containers: {
            home: {
              type: 'page',
              label: 'home',
              repositories: {
                form1: {
                  type: 'Simple',
                  parameters: {},
                },
              },
              widgets: {
                w1: {
                  tag: 'sk-text',
                  label: 'text',
                  properties: {
                    value: '{{$.form1.deviceNumber}}',
                  },
                  events: {},
                },
                w2: {
                  tag: 'sk-input',
                  label: 'deviceNumber',
                  properties: {
                    value: '{{$.form1.deviceNumber}}',
                  },
                  events: {
                    'value-changed': [
                      {
                        scope: 'container',
                        target: 'form1',
                        action: 'setValue',
                        path: ['deviceNumber'],
                      },
                    ],
                  },
                },
                w3: {
                  tag: 'sk-code',
                  label: 'code',
                  properties: {
                    value: '{{$.form1}}',
                  },
                  events: {},
                },
              },
              watches: {},
              tree: {
                root: ['w1', 'w2', 'w3'],
              },
            },
            about: {
              type: 'page',
              label: 'about',
              repositories: {
                form2: {
                  type: 'Simple',
                  parameters: {},
                },
              },
              widgets: {
                w1: {
                  tag: 'sk-text',
                  label: 'text',
                  properties: {
                    value: 'It is about page {{$.form2.value}}.',
                  },
                  events: {},
                },
              },
              watches: {},
              tree: {
                root: ['w1'],
              },
            },
          },
          screens: {},
        },
      },
    });
  });
});
