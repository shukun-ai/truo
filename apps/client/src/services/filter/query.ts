import { createEntityQuery } from '@datorama/akita';

import { FilterState, filterStore } from './store';

export const filterQuery = createEntityQuery<FilterState>(filterStore);

export const totalCount$ = filterQuery.selectActive(
  (state) => state.totalCount,
);
export const currentPage$ = filterQuery.selectActive(
  (state) => state.currentPage,
);
export const pageSize$ = filterQuery.selectActive((state) => state.pageSize);
export const filter$ = filterQuery.selectActive((state) => state.filter);
export const sort$ = filterQuery.selectActive((state) => state.sort);

export const activeSearch$ = filterQuery.selectActive((state) => state);
