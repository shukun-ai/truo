import { createQuery } from '@datorama/akita';

import { DetailState, detailStore } from './store';

export const detailQuery = createQuery<DetailState>(detailStore);

export const source$ = detailQuery.select((state) => state.source);

export const mode$ = detailQuery.select((state) => state.mode);

export const loading$ = detailQuery.select((state) => state.loading);
