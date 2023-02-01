import { MetadataElectron } from '@shukun/schema';

export type FlatMetadataSchema = {
  [atomName: string]: {
    [electronName: string]: MetadataElectron;
  };
};

export type FlatMetadataElectron = {
  [electronName: string]: MetadataElectron;
};
