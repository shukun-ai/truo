import { EntityState, createEntityStore } from '@datorama/akita';
import { MetadataSchema } from '@shukun/schema';
import { produce } from 'immer';

import { StoreNames } from '../../utils/store-names';

export interface MetadataState extends EntityState<MetadataSchema, string> {}

const initialState: MetadataState = {};

export const metadataStore = createEntityStore<MetadataState>(initialState, {
  name: StoreNames.Metadata,
  idKey: 'atom.name',
  producerFn: produce,
});
