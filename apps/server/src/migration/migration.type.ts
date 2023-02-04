import { MetadataElectron } from '@shukun/schema';

export type DiffResult = {
  added: DiffMetadataSchema;
  deleted: DiffMetadataSchema;
  updated: DiffMetadataSchema;
};

export type DiffMetadataSchema = {
  [atomName: string]: DiffMetadataElectron;
};

export type DiffMetadataElectron = {
  [electronName: string]: Partial<MetadataElectron>;
};
