import { createStore } from '@datorama/akita';
import { UnknownSourceModel } from '@shukun/schema';
import { produce } from 'immer';

import { StoreNames } from '../../utils/store-names';

import { DetailMode } from './model';

export interface DetailState {
  source: UnknownSourceModel | null;
  mode: DetailMode;
  loading: boolean;
}

const initialState: DetailState = {
  source: null,
  mode: DetailMode.Show,
  loading: false,
};

export const detailStore = createStore<DetailState>(initialState, {
  name: StoreNames.Detail,
  producerFn: produce,
});
