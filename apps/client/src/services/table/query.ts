import { createEntityQuery } from '@datorama/akita';

import { TableState, tableStore } from './store';

export const tableQuery = createEntityQuery<TableState>(tableStore);

export const table$ = tableQuery.select();

export const tableLoading$ = tableQuery.select((state) => state.loading);

export const tableEntities$ = tableQuery.selectAll();

export const tableActiveIds$ = tableQuery.selectActiveId();

export const tableActiveEntities$ = tableQuery.selectActive();

export const getTableActiveEntities = () => tableQuery.getActive();
