import { createEntityQuery, Order } from '@datorama/akita';

import { ViewState, viewsStore } from './store';

export const viewsQuery = createEntityQuery<ViewState>(viewsStore, {
  sortBy: 'priority',
  sortByOrder: Order.ASC,
});

export const views$ = viewsQuery.selectAll();

export const activeView$ = viewsQuery.selectActive();

export const activeViews$ = viewsQuery.selectAll({
  filterBy: ({ isVisible }) => isVisible,
});

export const firstLevelView$ = viewsQuery.selectAll({
  filterBy: ({ isVisible, parentName }) => isVisible && !parentName,
});
