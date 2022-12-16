import {
  EntityState,
  ActiveState,
  StoreConfig,
  EntityStore,
} from '@datorama/akita';
import { MetadataSchema } from '@shukun/schema';
import { produce } from 'immer';

import { StoreNames } from '../names';

export interface MetadataState
  extends EntityState<MetadataSchema, string>,
    ActiveState {}

export const initialState: MetadataState = {
  active: null,
};

@StoreConfig({
  name: StoreNames.Metadata,
  idKey: 'name',
  producerFn: produce,
})
export class MetadataStore extends EntityStore<MetadataState> {
  constructor() {
    super(initialState);
  }
}
