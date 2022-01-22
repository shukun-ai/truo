import { EntityState, createEntityStore, ActiveState } from '@datorama/akita';
import { produce } from 'immer';

import { StoreNames } from '../../utils/store-names';

import { FilterModel } from './model';

export interface FilterState
  extends EntityState<FilterModel, string>,
    ActiveState {}

export const initialState: FilterState = {
  active: null,
};

export const filterStore = createEntityStore<FilterState>(initialState, {
  name: StoreNames.Filter,
  idKey: 'viewName',
  producerFn: produce,
});
