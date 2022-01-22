import { EntityState, createEntityStore, ActiveState } from '@datorama/akita';
import { ViewSchema } from '@shukun/schema';
import { produce } from 'immer';

import { StoreNames } from '../../utils/store-names';

export interface ViewState
  extends EntityState<ViewSchema, string>,
    ActiveState {}

const initialState: ViewState = {
  active: null,
};

export const viewsStore = createEntityStore<ViewState>(initialState, {
  name: StoreNames.View,
  idKey: 'name',
  producerFn: produce,
});
