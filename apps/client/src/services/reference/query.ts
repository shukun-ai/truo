import { createEntityQuery } from '@datorama/akita';

import { ReferenceState, referenceStore } from './store';

export const referenceQuery = createEntityQuery<ReferenceState>(referenceStore);

export const reference$ = referenceQuery.select();

export const loading$ = referenceQuery.select((state) => state.loading);

export const totalPages$ = referenceQuery.select((state) => state.totalPages);

export const currentPage$ = referenceQuery.select((state) => state.currentPage);

export const pageSize$ = referenceQuery.select((state) => state.pageSize);

export const referenceEntities$ = referenceQuery.selectAll();

export const modalVisible$ = referenceQuery.select(
  (state) => state.modalVisible,
);

export const modalLabel$ = referenceQuery.select((state) => state.modalLabel);

export const electronReferenceTo$ = referenceQuery.select(
  (state) => state.electronReferenceTo,
);

export const selectionType$ = referenceQuery.select(
  (state) => state.selectionType,
);

export const selectedRow$ = referenceQuery.select((state) => state.selectedRow);

export const view$ = referenceQuery.select((state) => state.view);

export const onFinish$ = referenceQuery.select((state) => ({
  method: state.onFinish,
}));
