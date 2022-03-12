import { SortQueryStringValues } from './model';

export function formatSortToQueryString(sort: SortQueryStringValues | null) {
  if (!sort) {
    return '';
  }

  return Object.keys(sort)
    .map((key) => {
      const value = sort[key];
      if (!value) {
        return '';
      }
      return `${value === 'descend' ? '-' : ''}${key}`;
    })
    .filter((key) => key)
    .join(',');
}
