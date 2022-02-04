import { FilterQueryStringValues, SortQueryStringValues } from '../table/model';

import { SearchModel } from './model';
import { searchStore } from './store';

import { defaultSearchValue } from './constant';
import { ViewSearch } from '@shukun/schema';
import { merge } from 'lodash';

export class SearchService {
  setActive(viewName: string, viewSearch: ViewSearch | null) {
    const filterValue = merge({}, defaultSearchValue, viewSearch);

    searchStore.add({
      viewName,
      ...filterValue,
    });
    searchStore.setActive(viewName);
  }

  // TODO: use Akitajs Query instead
  getAllByViewName(viewName: string) {
    const { entities } = searchStore.getValue();

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
  getSearchByViewName(viewName: string) {
    const entity = this.getAllByViewName(viewName);

    if (!entity) {
      const defaultValue: SearchModel = {
        viewName,
        totalCount: defaultSearchValue.totalCount,
        currentPage: defaultSearchValue.currentPage,
        pageSize: defaultSearchValue.pageSize,
        filter: defaultSearchValue.filter,
        sort: defaultSearchValue.sort,
      };
      return defaultValue;
    }

    return entity;
  }

  async updateSearch(search: SearchModel, viewSearch: ViewSearch | null) {
    searchStore.updateActive(() =>
      merge<Partial<SearchModel>, ViewSearch | null, SearchModel>(
        {},
        viewSearch,
        search,
      ),
    );
  }

  async updateSearchFilter(
    filter: FilterQueryStringValues,
    viewSearch: ViewSearch | null,
  ) {
    searchStore.updateActive(() => ({
      filter: merge({}, viewSearch?.filter, filter),
    }));
  }

  async clearSearchFilter(viewSearch: ViewSearch | null) {
    searchStore.updateActive(() => ({
      filter: viewSearch?.filter as FilterQueryStringValues,
    }));
  }

  async updateSearchSort(
    sort: SortQueryStringValues,
    viewSearch: ViewSearch | null,
  ) {
    searchStore.updateActive(() => ({
      sort: merge({}, viewSearch?.sort, sort),
    }));
  }

  async clearSearchSort(viewSearch: ViewSearch | null) {
    searchStore.updateActive(() => ({
      sort: viewSearch?.sort as SortQueryStringValues,
    }));
  }

  async updateSearchPagination(pagination: {
    currentPage?: number;
    pageSize?: number;
  }) {
    searchStore.updateActive(() => ({
      ...pagination,
    }));
  }

  async updateSearchTotalCount(totalCount: number) {
    searchStore.updateActive(() => ({
      totalCount,
    }));
  }
}

export const searchService = new SearchService();
