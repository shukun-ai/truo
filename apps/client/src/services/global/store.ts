import { createStore } from '@datorama/akita';
import { SystemPublicOrgModel } from '@shukun/schema';
import { produce } from 'immer';

import { StoreNames } from '../../utils/store-names';

export interface GlobalState {
  org: SystemPublicOrgModel | null;
}

const initialState: GlobalState = {
  org: null,
};

export const globalStore = createStore<GlobalState>(initialState, {
  name: StoreNames.Global,
  producerFn: produce,
});
