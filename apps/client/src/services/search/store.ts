import {
  EntityState,
  ActiveState,
  StoreConfig,
  EntityStore,
} from '@datorama/akita';
import { produce } from 'immer';

import { StoreNames } from '../../utils/store-names';

import { SearchModel } from './model';

export interface SearchState
  extends EntityState<SearchModel, string>,
    ActiveState {}

export const initialState: SearchState = {
  active: null,
};

@StoreConfig({
  name: StoreNames.Search,
  idKey: 'viewName',
  producerFn: produce,
})
export class SearchStore extends EntityStore<SearchState> {
  constructor() {
    super(initialState);
  }
}
