import { FlowEvent } from '@shukun/schema';

import { EventUI } from './interface/event-ui';

export const eventUI: Record<FlowEvent['type'], EventUI> = {
  Success: { ...getDefaultUI(), ...getSmallSize() },
  Fail: { ...getDefaultUI(), ...getSmallSize() },
  SourceQuery: { ...getDefaultUI() },
  SourceCreate: { ...getDefaultUI() },
  SourceUpdate: { ...getDefaultUI() },
  SourceDelete: { ...getDefaultUI() },
  SourceAddToMany: { ...getDefaultUI() },
  SourceRemoveFromMany: { ...getDefaultUI() },
  SourceIncrease: { ...getDefaultUI() },
  Choice: { ...getDefaultUI() },
  Repeat: { ...getDefaultUI() },
  Parallel: { ...getDefaultUI() },
  Store: { ...getDefaultUI() },
  FirstOrThrow: { ...getDefaultUI(), ...getSmallSize() },
  LastOrThrow: { ...getDefaultUI(), ...getSmallSize() },
};

function getDefaultUI(): EventUI {
  return {
    width: 360,
    height: 180,
    backgroundColor: '#000',
    fontColor: '#fff',
  };
}

function getSmallSize(): {
  width: EventUI['width'];
  height: EventUI['height'];
} {
  return {
    width: 360,
    height: 32,
  };
}
