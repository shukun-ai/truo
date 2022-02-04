import { EntityState, createEntityStore, ActiveState } from '@datorama/akita';
import { produce } from 'immer';

import { StoreNames } from '../../utils/store-names';

import { SearchModel } from './model';

export interface SearchState
  extends EntityState<SearchModel, string>,
    ActiveState {}

export const initialState: SearchState = {
  active: null,
};

export const searchStore = createEntityStore<SearchState>(initialState, {
  name: StoreNames.Search,
  idKey: 'viewName',
  producerFn: produce,
});
