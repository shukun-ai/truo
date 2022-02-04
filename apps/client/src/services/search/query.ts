import { createEntityQuery } from '@datorama/akita';

import { SearchState, searchStore } from './store';

export const searchQuery = createEntityQuery<SearchState>(searchStore);

export const totalCount$ = searchQuery.selectActive(
  (state) => state.totalCount,
);
export const currentPage$ = searchQuery.selectActive(
  (state) => state.currentPage,
);
export const pageSize$ = searchQuery.selectActive((state) => state.pageSize);
export const filter$ = searchQuery.selectActive((state) => state.filter);
export const sort$ = searchQuery.selectActive((state) => state.sort);

export const activeSearch$ = searchQuery.selectActive((state) => state);
