import { StoreConfig, EntityStore, Store } from '@datorama/akita';
import { FlowEvent } from '@shukun/schema';
import { produce } from 'immer';

import { StoreNames } from '../names';

export interface FlowUIState {
  insertModalVisible: boolean;
  editingMode: 'create' | 'update';
  editingEventName: string | null;
  editingEvent: Partial<FlowEvent> | null;
}

export const initialState: FlowUIState = {
  insertModalVisible: false,
  editingMode: 'create',
  editingEventName: null,
  editingEvent: null,
};

@StoreConfig({
  name: StoreNames.FlowUI,
  idKey: 'name',
  producerFn: produce,
})
export class FlowUIStore extends Store<FlowUIState> {
  constructor() {
    super(initialState);
  }
}
