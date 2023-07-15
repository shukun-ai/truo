import { createStore, withProps } from '@ngneat/elf';

import { withMetadata } from './metadata-ref';

export type MetadataProps = {
  initialized: boolean;
  selectedMetadataId: string | null;
};

export const metadataStore = createStore(
  { name: 'metadata' },
  withProps<MetadataProps>({
    initialized: false,
    selectedMetadataId: null,
  }),
  withMetadata(),
);
