import { createStore, withProps } from '@ngneat/elf';

import { MetadataElectron } from '@shukun/schema';

import { withMetadata } from './metadata-ref';

export type MetadataProps = {
  initialized: boolean;
  selectedMetadataId: string | null;
  allowedFieldType: MetadataElectron['fieldType'][];
};

export const metadataStore = createStore(
  { name: 'metadata' },
  withProps<MetadataProps>({
    initialized: false,
    selectedMetadataId: null,
    allowedFieldType: [
      'Text',
      'LargeText',
      'SingleSelect',
      'Boolean',
      'DateTime',
      'Integer',
      'Float',
      'Currency',
      'Password',
      'ManyToOne',
      'Attachment',
      'Mixed',
    ],
  }),
  withMetadata(),
);
