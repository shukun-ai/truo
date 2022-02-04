import { SearchModel } from './model';

export const defaultSearchValue: Omit<SearchModel, 'viewName'> = {
  totalCount: 1,
  currentPage: 1,
  pageSize: 10,
  filter: null,
  sort: null,
};
