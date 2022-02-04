import { FilterQueryStringValues, SortQueryStringValues } from '../table/model';

import { FilterModel } from './model';
import { filterStore } from './store';

import { defaultFilterValue } from '.';
import { ViewSearch } from '@shukun/schema';
import { merge } from 'lodash';

export class FilterService {
  setActive(viewName: string, viewSearch: ViewSearch | null) {
    const filterValue = merge({}, defaultFilterValue, viewSearch);

    filterStore.add({
      viewName,
      ...filterValue,
    });
    filterStore.setActive(viewName);
  }

  // TODO: use Akitajs Query instead
  getByViewName(viewName: string) {
    const { entities } = filterStore.getValue();

    if (!entities) {
      return null;
    }

    const entity = Object.values(entities).find((entity) => {
      return entity.viewName === viewName;
    });

    if (!entity) {
      return null;
    }

    return entity;
  }

  // TODO: use Akitajs Query instead
  getFilterByViewName(viewName: string) {
    const entity = this.getByViewName(viewName);

    if (!entity) {
      const defaultValue: FilterModel = {
        viewName,
        totalCount: defaultFilterValue.totalCount,
        currentPage: defaultFilterValue.currentPage,
        pageSize: defaultFilterValue.pageSize,
        filter: defaultFilterValue.filter,
        sort: defaultFilterValue.sort,
      };
      return defaultValue;
    }

    return entity;
  }

  // TODO: The FilterStore should be rename to SearchStore
  async updateSearch(search: FilterModel, viewSearch: ViewSearch | null) {
    filterStore.updateActive(() =>
      merge<Partial<FilterModel>, ViewSearch | null, FilterModel>(
        {},
        viewSearch,
        search,
      ),
    );
  }

  // TODO: rename to updateSearchFilter
  async updateFilter(
    filter: FilterQueryStringValues,
    viewSearch: ViewSearch | null,
  ) {
    filterStore.updateActive(() => ({
      filter: merge({}, viewSearch?.filter, filter),
    }));
  }

  // TODO: rename to clearSearchFilter
  async clearFilter(viewSearch: ViewSearch | null) {
    filterStore.updateActive(() => ({
      filter: viewSearch?.filter as FilterQueryStringValues,
    }));
  }

  // TODO: rename to updateSearchSort
  async updateSort(sort: SortQueryStringValues, viewSearch: ViewSearch | null) {
    filterStore.updateActive(() => ({
      sort: merge({}, viewSearch?.sort, sort),
    }));
  }

  // TODO: rename to clearSearchSort
  async clearSort(viewSearch: ViewSearch | null) {
    filterStore.updateActive(() => ({
      sort: viewSearch?.sort as SortQueryStringValues,
    }));
  }

  // TODO: rename to updateSearchPagination
  async updatePagination(pagination: {
    currentPage?: number;
    pageSize?: number;
  }) {
    filterStore.updateActive(() => ({
      ...pagination,
    }));
  }

  // TODO: rename to updateSearchTotalCount
  async updateTotalCount(totalCount: number) {
    filterStore.updateActive(() => ({
      totalCount,
    }));
  }
}

export const filterService = new FilterService();
