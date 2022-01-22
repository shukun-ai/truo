import { IDString } from '../../utils/model-helpers';

// @todo should be merged into UnknownSourceModel.
export interface UnknownMetadataModel {
  _id: IDString;
  [name: string]: unknown;
}
