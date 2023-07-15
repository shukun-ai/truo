import { MetadataElectron } from './application';

// TODO should be removed when the Metadata be refactored
export type MetadataReviseSchema = {
  label: string;
  description?: string;
  electrons: Record<string, MetadataElectron>;
};
