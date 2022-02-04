import { StoreConfig, Store } from '@datorama/akita';
import { produce } from 'immer';
import { MetadataSchema, ViewSchema } from '@shukun/schema';

import { UnknownSourceModel } from '../../models/source';
import { StoreNames } from '../../utils/store-names';
import { SearchModel } from '../search';
import { CustomMode } from '@shukun/api';

export interface CustomModalState {
  customMode: CustomMode | null;
  label: string | null;
  visible: boolean;
  loading: boolean;
  url: string | null;
  search: SearchModel | null;
  sources: UnknownSourceModel[];
  view: ViewSchema | null;
  metadata: MetadataSchema | null;
}

export const initialState: CustomModalState = {
  customMode: null,
  label: null,
  visible: false,
  loading: false,
  url: null,
  search: null,
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
