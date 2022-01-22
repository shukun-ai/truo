import { createEntityQuery } from '@datorama/akita';

import { SourceState, sourcesStore } from './store';

export const sourcesQuery = createEntityQuery<SourceState>(sourcesStore);

export const sources$ = sourcesQuery.selectAll();

export const activeSource$ = sourcesQuery.selectActive();
