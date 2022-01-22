import { FilterModel } from './model';

export const defaultFilterValue: Omit<FilterModel, 'viewName'> = {
  totalCount: 1,
  currentPage: 1,
  pageSize: 10,
  filter: null,
  sort: null,
};
