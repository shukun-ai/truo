import { FilterQueryStringValues, SortQueryStringValues } from '../table/model';

export interface SearchModel {
  viewName: string;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  filter: FilterQueryStringValues | null;
  sort: SortQueryStringValues | null;
}
