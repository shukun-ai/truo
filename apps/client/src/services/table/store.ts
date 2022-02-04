import {
  EntityState,
  createEntityStore,
  MultiActiveState,
} from '@datorama/akita';
import { produce } from 'immer';

import { UnknownSourceModel } from '../../models/source';
import { StoreNames } from '../../utils/store-names';

export interface TableState
  extends EntityState<UnknownSourceModel, string>,
    MultiActiveState {
  loading: boolean;
}

export const initialState: TableState = {
  active: [],
  loading: false,
};

export const tableStore = createEntityStore<TableState>(initialState, {
  name: StoreNames.Table,
  idKey: '_id',
  producerFn: produce,
});
