import { createEntityQuery } from '@datorama/akita';

import { MetadataState, metadataStore } from './store';

export const metadataQuery = createEntityQuery<MetadataState>(metadataStore);

export const metadata$ = metadataQuery.selectAll();
