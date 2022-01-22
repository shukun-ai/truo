import { FilterQueryStringValues, SortQueryStringValues } from '../table/model';

import { FilterModel } from './model';
import { filterStore } from './store';

import { defaultFilterValue } from '.';

export class FilterService {
  upsert(filter: FilterModel) {
    filterStore.upsert(filter.viewName, filter);
  }

  clear(viewName: string) {
    filterStore.remove(viewName);
  }

  setActive(viewName: string) {
    filterStore.add({
      viewName,
      ...defaultFilterValue,
    });
    filterStore.setActive(viewName);
  }

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

  async updateFilter(filter: FilterQueryStringValues) {
    filterStore.updateActive(() => ({
      filter,
    }));
  }

  async clearFilter() {
    filterStore.updateActive(() => ({
      filter: null,
    }));
  }

  async updateSort(sort: SortQueryStringValues) {
    filterStore.updateActive(() => ({
      sort,
    }));
  }

  async clearSort() {
    filterStore.updateActive(() => ({
      sort: null,
    }));
  }

  async updatePagination(pagination: {
    currentPage?: number;
    pageSize?: number;
  }) {
    filterStore.updateActive(() => ({
      ...pagination,
    }));
  }

  async updateTotalCount(totalCount: number) {
    filterStore.updateActive(() => ({
      totalCount,
    }));
  }
}

export const filterService = new FilterService();
