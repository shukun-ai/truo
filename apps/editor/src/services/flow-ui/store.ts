import { StoreConfig, Store } from '@datorama/akita';
import { produce } from 'immer';

import { StoreNames } from '../names';

export interface FlowUIState {
  insertModalVisible: boolean;
  codeModalVisible: boolean;
}

export const initialState: FlowUIState = {
  insertModalVisible: false,
  codeModalVisible: false,
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
