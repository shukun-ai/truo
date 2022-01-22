import { UnknownMetadataModel } from '../metadata';

export type UnknownSourceModel = UnknownMetadataModel;

export interface SourceModel {
  uniqueId: string;
  atomName: string;
  source: UnknownSourceModel;
}
