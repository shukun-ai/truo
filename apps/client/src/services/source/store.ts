import { EntityState, createEntityStore, ActiveState } from '@datorama/akita';
import { produce } from 'immer';

import { SourceModel } from '../../models/source';
import { StoreNames } from '../../utils/store-names';

export interface SourceState
  extends EntityState<SourceModel, string>,
    ActiveState {}

const initialState: SourceState = {
  active: null,
};

export const sourcesStore = createEntityStore<SourceState>(initialState, {
  name: StoreNames.Source,
  idKey: 'uniqueId',
  producerFn: produce,
});
