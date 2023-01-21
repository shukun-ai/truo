import { UnknownSourceModel } from '@shukun/schema';

export interface SourceModel {
  uniqueId: string;
  atomName: string;
  source: UnknownSourceModel;
}
