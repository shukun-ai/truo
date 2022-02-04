import { QueryEntity } from '@datorama/akita';

import { SearchState, SearchStore } from './store';

export class SearchQuery extends QueryEntity<SearchState> {
  totalCount$ = this.selectActive((state) => state.totalCount);

  currentPage$ = this.selectActive((state) => state.currentPage);

  pageSize$ = this.selectActive((state) => state.pageSize);

  filter$ = this.selectActive((state) => state.filter);

  sort$ = this.selectActive((state) => state.sort);

  activeSearch$ = this.selectActive((state) => state);

  constructor(protected readonly searchStore: SearchStore) {
    super(searchStore);
  }
}
