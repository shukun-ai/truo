import { StoreConfig, Store } from '@datorama/akita';
import { produce } from 'immer';

import { UnknownSourceModel } from '../../models/source';
import { StoreNames } from '../../utils/store-names';

export interface CustomModalState {
  label: string | null;
  visible: boolean;
  loading: boolean;
  url: string | null;
  sources: UnknownSourceModel[];
}

export const initialState: CustomModalState = {
  label: null,
  visible: false,
  loading: false,
  url: null,
  sources: [],
};

@StoreConfig({
  name: StoreNames.CustomModal,
  idKey: '_id',
  producerFn: produce,
})
export class CustomModalStore extends Store<CustomModalState> {
  constructor() {
    super(initialState);
  }
}
