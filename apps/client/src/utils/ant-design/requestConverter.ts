import { ReactText } from 'react';

export interface FilterMaps {
  [key: string]: '$regex';
}

export function convertAntDesignParams(
  params: Record<string, string | number | undefined | null> & {
    pageSize?: number | undefined;
    current?: number | undefined;
    keyword?: string | undefined;
  },
  sort: Record<string, any>,
  filter: Record<string, ReactText[]>,
  filterMaps: FilterMaps = {},
) {
  const pageSize = params.pageSize || 20;
  const current = params.current || 1;
  const limit = pageSize;
  const skip = pageSize * (current - 1);
  delete params.pageSize;
  delete params.current;

  const parseFilter = convertFilterMaps(params, filterMaps);
  const parseSort = convertSort(sort);

  return {
    limit,
    skip,
    filter: parseFilter,
    sort: parseSort,
  };
}

function convertFilterMaps(
  params: Record<string, string | number | undefined | null>,
  filterMaps: FilterMaps = {},
) {
  const parsed: Record<string, any> = {};

  for (const key in params) {
    const type = filterMaps[key];
    const value = params[key];

    switch (type) {
      case '$regex':
        parsed[key] = { $regex: value };
        break;
      default:
        parsed[key] = value;
    }
  }

  return parsed;
}

/**
 * @see https://www.npmjs.com/package/mongoose-query-parser sort string
 * @example
 * 'name,-createdAt'
 */
function convertSort(sort: Record<string, any>) {
  const holder = [];
  for (const key in sort) {
    const node = sort[key] === 'ascend' ? key : `-${key}`;
    holder.push(node);
  }
  return holder.join(',');
}
