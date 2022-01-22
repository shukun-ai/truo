import { createStore } from '@datorama/akita';
import { produce } from 'immer';

import { OrgModel } from '../../models/org/model';
import { StoreNames } from '../../utils/store-names';

export interface GlobalState {
  org: OrgModel | null;
}

const initialState: GlobalState = {
  org: null,
};

export const globalStore = createStore<GlobalState>(initialState, {
  name: StoreNames.Global,
  producerFn: produce,
});
