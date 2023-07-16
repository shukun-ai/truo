import { createStore, withProps } from '@ngneat/elf';

import { MetadataElectron } from '@shukun/schema';

import { withMetadata } from './metadata-ref';

export type MetadataProps = {
  initialized: boolean;
  selectedMetadataId: string | null;
  allowedFieldType: {
    type: MetadataElectron['fieldType'];
    deprecated?: boolean;
    system?: boolean;
  }[];
};

export const metadataStore = createStore(
  { name: 'metadata' },
  withProps<MetadataProps>({
    initialized: false,
    selectedMetadataId: null,
    allowedFieldType: [
      { type: 'Text' },
      { type: 'NameText', deprecated: true },
      { type: 'LargeText' },
      { type: 'SingleSelect' },
      { type: 'MultiSelect', deprecated: true },
      { type: 'Boolean' },
      { type: 'DateTime' },
      { type: 'Integer' },
      { type: 'Float' },
      { type: 'Currency' },
      { type: 'Password' },
      { type: 'ManyToMany', deprecated: true },
      { type: 'ManyToOne' },
      { type: 'Owner', system: true },
      { type: 'Attachment' },
      { type: 'Mixed' },
      { type: 'Role', system: true },
    ],
  }),
  withMetadata(),
);
