import { FilterQueryStringValues, SortQueryStringValues } from '../table/model';

export interface FilterModel {
  viewName: string;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  filter: FilterQueryStringValues | null;
  sort: SortQueryStringValues | null;
}
