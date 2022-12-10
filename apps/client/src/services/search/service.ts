import { ViewSearch } from '@shukun/schema';

import { merge } from 'lodash';

import { defaultSearchValue } from './constant';
import { SearchModel, SearchSort } from './model';
import { SearchStore } from './store';

export class SearchService {
  constructor(private readonly searchStore: SearchStore) {}

  setActive(viewName: string, viewSearch: ViewSearch | null) {
    const filterValue = merge({}, defaultSearchValue, viewSearch);

    this.searchStore.add({
      viewName,
      ...filterValue,
    });
    this.searchStore.setActive(viewName);
  }

  // TODO: use Akitajs Query instead
  getAllByViewName(viewName: string) {
    const { entities } = this.searchStore.getValue();

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
    this.searchStore.updateActive(() =>
      merge<Partial<SearchModel>, ViewSearch | null, SearchModel>(
        {},
        viewSearch,
        search,
      ),
    );
  }

  async updateSearchFilter(
    filter: NonNullable<SearchModel['filter']>,
    viewSearch: ViewSearch | null,
  ) {
    this.searchStore.updateActive(() => ({
      filter: {
        ...viewSearch?.filter,
        ...filter,
      },
      currentPage: 1,
    }));
  }

  async resetSearchFilter(viewSearch: ViewSearch | null) {
    this.searchStore.updateActive(() => ({
      filter: viewSearch ? viewSearch.filter : null,
    }));
  }

  async updateSearchSort(sort: SearchSort, viewSearch: ViewSearch | null) {
    this.searchStore.updateActive(() => ({
      sort: {
        ...viewSearch?.sort,
        ...sort,
      },
    }));
  }

  async resetSearchSort(viewSearch: ViewSearch | null) {
    this.searchStore.updateActive(() => ({
      sort: viewSearch ? viewSearch.sort : null,
    }));
  }

  async updateSearchPagination(pagination: {
    currentPage?: number;
    pageSize?: number;
  }) {
    this.searchStore.updateActive(() => ({
      ...pagination,
    }));
  }

  async updateSearchTotalCount(totalCount: number) {
    this.searchStore.updateActive(() => ({
      totalCount,
    }));
  }
}
