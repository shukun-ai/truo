import {
  EntityState,
  ActiveState,
  StoreConfig,
  EntityStore,
} from '@datorama/akita';
import { FlowSchema } from '@shukun/schema';
import { produce } from 'immer';

import { StoreNames } from '../names';

export interface FlowState
  extends EntityState<FlowSchema, string>,
    ActiveState {}

export const initialState: FlowState = {
  active: null,
};

@StoreConfig({
  name: StoreNames.Flow,
  idKey: 'name',
  producerFn: produce,
})
export class FlowStore extends EntityStore<FlowState> {
  constructor() {
    super(initialState);
  }
}
