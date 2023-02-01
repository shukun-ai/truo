import { MetadataElectron } from '@shukun/schema';

export type DiffMetadataSchema = {
  [atomName: string]: {
    [electronName: string]: Partial<MetadataElectron>;
  };
};

export type DiffResult = {
  added: DiffMetadataSchema;
  deleted: DiffMetadataSchema;
  updated: DiffMetadataSchema;
};
