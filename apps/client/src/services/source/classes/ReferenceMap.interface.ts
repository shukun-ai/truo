import { IDString } from '../../../utils/model-helpers';

export interface ReferenceMap {
  electronName: string;
  referenceTo: string;
  foreignName: string;
  ids: IDString[];
}
