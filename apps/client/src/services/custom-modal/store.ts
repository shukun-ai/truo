import { StoreConfig, Store } from '@datorama/akita';
import { produce } from 'immer';
import { MetadataSchema, ViewSchema } from '../../../../../libs/schema/src';

import { UnknownSourceModel } from '../../models/source';
import { StoreNames } from '../../utils/store-names';

export interface CustomModalState {
  label: string | null;
  visible: boolean;
  loading: boolean;
  url: string | null;
  sources: UnknownSourceModel[];
  view: ViewSchema | null;
  metadata: MetadataSchema | null;
}

export const initialState: CustomModalState = {
  label: null,
  visible: false,
  loading: false,
  url: null,
  sources: [],
  view: null,
  metadata: null,
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
