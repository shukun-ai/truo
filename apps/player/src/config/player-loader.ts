import { PlayerSchema } from '@shukun/schema';

export class PlayerLoader {
  public async load(): Promise<PlayerSchema> {
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
            sourceQuery1: {
              type: 'SourceQuery',
              atomName: 'devices',
              query: {
                number: '{{ form1.deviceNumber }}',
              },
            },
            transformer1: {
              type: 'Transformer',
              func: 'return JSON.stringify(form1);',
            },
          },
          events: {
            w3Change1: {
              action: 'setRepository',
              target: 'form1',
              path: ['deviceNumber'],
              value: '{{ event.detail.value }}',
            },
            w4Click1: {
              action: 'triggerRepository',
              target: 'sourceQuery1',
            },
          },
          widgets: {
            w1: {
              tag: 'sk-layout',
              states: {
                width: '80%',
              },
              events: {},
            },
            w2: {
              tag: 'sk-text',
              states: {
                title: '设备查询 - 查询 {{form1.deviceNumber}}',
              },
              events: {},
            },
            w3: {
              tag: 'sk-input',
              states: {
                label: '设备号',
                value: '{{ form1.deviceNumber }}',
              },
              events: {
                change: ['w3Change1'],
              },
            },
            w4: {
              tag: 'sk-button',
              states: {},
              events: {
                click: ['w4Click1'],
              },
            },
          },
          root: ['w1'],
          tree: {
            w1: ['w2', 'w3', 'w4'],
          },
        },
      },
    };
  }
}

// const elements = new Array(count)
//       .fill(1)
//       .reduce((previous, next, index) => {
//         return {
//           ...previous,
//           ['ee' + index]: {
//             element: 'sk-text',
//             inputs: {
//               title: 'Hello ${$.e2.value}',
//             },
//           },
//         };
//       }, {} as any);

//     const tags = new Array(count).fill(1).map((item, index) => 'ee' + index);
