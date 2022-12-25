import { FlowEvents } from '@shukun/schema';

import { filterSubEventNames } from './filter-elements';
describe('', () => {
  it('', () => {
    const events: FlowEvents = {
      repeat: {
        type: 'Repeat',
        next: 'choice',
        repeatCount: '3',
        startEventName: 'repeatFirst',
      },
      repeatFirst: {
        type: 'Success',
        output: '3',
      },
      choice: {
        type: 'Choice',
        next: 'defaultReturn',
        conditions: [
          {
            condition: '$.parameter.vehicleNumber === 3',
            next: 'choiceFirst',
          },
          {
            condition: '$.parameter.vehicleNumber === 5',
            next: 'choiceSecond',
          },
        ],
      },
      choiceFirst: {
        type: 'Success',
        output: "'choiceFirst'",
      },
      choiceSecond: {
        type: 'Store',
        key: 'vehicle',
        value: '3',
        next: 'parallel',
      },
      parallel: {
        type: 'Parallel',
        next: 'defaultReturn',
        branches: [
          {
            startEventName: 'parallelFirst',
          },
          {
            startEventName: 'parallelSecond',
          },
        ],
      },
      parallelFirst: {
        type: 'SourceQuery',
        atomName: 'devices',
        next: '',
        query: {},
      },
      parallelSecond: {
        type: 'SourceQuery',
        atomName: 'devices',
        next: '',
        query: {},
      },
      defaultReturn: {
        type: 'Success',
        output: "'defaultReturn'",
      },
    };

    const subEventNames = filterSubEventNames(events);

    expect(subEventNames).toEqual([
      'repeatFirst',
      'parallelFirst',
      'parallelSecond',
    ]);
  });
});
