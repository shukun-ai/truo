import { createQuery } from '@datorama/akita';

import { GlobalState, globalStore } from './store';

export const orgQuery = createQuery<GlobalState>(globalStore);

export const org$ = orgQuery.select((state) => state.org);
