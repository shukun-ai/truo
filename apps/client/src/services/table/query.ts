import { createEntityQuery } from '@datorama/akita';

import { TableState, tableStore } from './store';

export const tableQuery = createEntityQuery<TableState>(tableStore);

export const table$ = tableQuery.select();

export const tableLoading$ = tableQuery.select((state) => state.loading);

export const tableEntities$ = tableQuery.selectAll();
