import { EntityState, createEntityStore, ActiveState } from '@datorama/akita';
import { UnknownSourceModel, ViewSchema } from '@shukun/schema';
import { RowSelectionType } from 'antd/lib/table/interface';
import { produce } from 'immer';

import { IDString } from '../../utils/model-helpers';
import { StoreNames } from '../../utils/store-names';

export interface ReferenceState
  extends EntityState<UnknownSourceModel, string>,
    ActiveState {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  loading: boolean;

  // reference modal has
  modalVisible: boolean;
  modalLabel: string | null;
  electronReferenceTo: string | null;
  selectionType: RowSelectionType;
  selectedRow: UnknownSourceModel[];
  view: ViewSchema | null;
  excludedIds: IDString[];
  onFinish:
    | ((selected: UnknownSourceModel[]) => Promise<boolean | void>)
    | null;
}

export const initialState: ReferenceState = {
  active: null,
  totalPages: 1,
  currentPage: 1,
  pageSize: 10,
  loading: false,
  modalVisible: false,
  modalLabel: null,
  electronReferenceTo: null,
  selectionType: 'checkbox',
  selectedRow: [],
  view: null,
  excludedIds: [],
  onFinish: null,
};

export const referenceStore = createEntityStore<ReferenceState>(initialState, {
  name: StoreNames.Reference,
  idKey: '_id',
  producerFn: produce,
});
