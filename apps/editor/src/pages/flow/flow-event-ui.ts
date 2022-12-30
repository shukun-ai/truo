import { FlowEvent } from '@shukun/schema';

import { EventUI } from './interface/event-ui';

export const eventUI: Record<FlowEvent['type'], EventUI> = {
  Success: { ...getDefaultUI(), ...getSmallSize(), backgroundColor: '#1abc9c' },
  Fail: { ...getDefaultUI(), ...getSmallSize() },
  SourceQuery: {
    ...getDefaultUI(),
    backgroundColor: '#e95f2b',
  },
  SourceCreate: { ...getDefaultUI() },
  SourceUpdate: { ...getDefaultUI() },
  SourceDelete: { ...getDefaultUI() },
  SourceAddToMany: { ...getDefaultUI() },
  SourceRemoveFromMany: { ...getDefaultUI() },
  SourceIncrease: { ...getDefaultUI() },
  Choice: { ...getDefaultUI() },
  Repeat: { ...getDefaultUI() },
  Parallel: { ...getDefaultUI() },
  Store: { ...getDefaultUI(), ...getSmallSize(), backgroundColor: '#805dca' },
  FirstOrThrow: {
    ...getDefaultUI(),
    ...getSmallSize(),
    backgroundColor: '#e2a03f',
  },
  LastOrThrow: {
    ...getDefaultUI(),
    ...getSmallSize(),
    backgroundColor: '#e2a03f',
  },
};

function getDefaultUI(): EventUI {
  return {
    width: 240,
    height: 36,
    backgroundColor: '#000',
    fontColor: '#fff',
  };
}

function getSmallSize(): {
  width: EventUI['width'];
  height: EventUI['height'];
} {
  return {
    width: 240,
    height: 36,
  };
}
