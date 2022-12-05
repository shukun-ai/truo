import { HttpQuerySchema } from '@shukun/schema';

import { FilterQueryStringValues, SortQueryStringValues } from './model';

export function formatSort(
  sort: SortQueryStringValues | null,
): HttpQuerySchema['sort'] {
  if (!sort) {
    return undefined;
  }

  const newSort: NonNullable<HttpQuerySchema['sort']> = {};

  for (const [key, value] of Object.entries(sort)) {
    if (value === 'ascend') {
      newSort[key] = 'asc';
    } else if (value === 'descend') {
      newSort[key] = 'desc';
    }
  }

  return newSort;
}

export function formatFilter(
  filter: FilterQueryStringValues | null,
): HttpQuerySchema['filter'] {
  if (!filter) {
    return undefined;
  }

  return filter;
}
