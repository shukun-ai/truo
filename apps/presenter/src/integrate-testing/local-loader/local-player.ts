import { PlayerSchema } from '@shukun/schema';

export function getLocalPlayer(): PlayerSchema {
  return {
    title: '',
    entry: 'home',
    containers: {
      home: {
        type: 'page',
        repositories: {
          form1: {
            type: 'Simple',
          },
        },
        events: {
          w2Click1: {
            action: 'setRepository',
            target: 'form1',
            path: ['deviceNumber'],
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
              onChange: ['w2Click1'],
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
        events: {},
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
  };
}
