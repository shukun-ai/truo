import { FilterQueryStringValues, SortQueryStringValues } from '../table/model';

import { FilterModel } from './model';
import { filterStore } from './store';

import { defaultFilterValue } from '.';
import { ViewQuery } from '@shukun/schema';
import { merge } from 'lodash';

export class FilterService {
  setActive(viewName: string, viewQuery: ViewQuery | null) {
    const filterValue = merge({}, defaultFilterValue, viewQuery);

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
  // TODO: The viewQuery should be rename to ViewSearch
  async updateSearch(search: FilterModel, viewSearch: ViewQuery | null) {
    filterStore.updateActive(() =>
      merge<Partial<FilterModel>, ViewQuery | null, FilterModel>(
        {},
        viewSearch,
        search,
      ),
    );
  }

  // TODO: rename to updateSearchFilter
  async updateFilter(
    filter: FilterQueryStringValues,
    viewQuery: ViewQuery | null,
  ) {
    filterStore.updateActive(() => ({
      filter: merge({}, viewQuery?.['filter'], filter),
    }));
  }

  // TODO: rename to clearSearchFilter
  async clearFilter(viewQuery: ViewQuery | null) {
    filterStore.updateActive(() => ({
      filter: merge({}, viewQuery?.['filter']),
    }));
  }

  // TODO: rename to updateSearchSort
  async updateSort(sort: SortQueryStringValues, viewQuery: ViewQuery | null) {
    filterStore.updateActive(() => ({
      sort: merge({}, viewQuery?.['sort'], sort),
    }));
  }

  // TODO: rename to clearSearchSort
  async clearSort(viewQuery: ViewQuery | null) {
    filterStore.updateActive(() => ({
      sort: merge({}, viewQuery?.['sort']),
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
