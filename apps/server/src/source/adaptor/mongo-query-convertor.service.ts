import { Injectable } from '@nestjs/common';
import { HttpQuerySchema } from '@shukun/schema';

import { QueryParserOptions } from '../../util/query/interfaces';

@Injectable()
export class MongoQueryConvertorService {
  parseMongoQuery(query: HttpQuerySchema): QueryParserOptions {
    const mongoQuery: QueryParserOptions = {
      filter: this.parseMongoFilter(query.filter),
      select: this.parseMongoSelect(query.select),
      sort: this.parseMongoSort(query.sort),
      limit: query.limit,
      skip: query.skip,
      count: query.count,
    };

    return mongoQuery;
  }

  protected parseMongoFilter(
    filter: HttpQuerySchema['filter'],
  ): QueryParserOptions['filter'] {
    if (!filter) {
      return filter;
    }

    if (
      typeof filter === 'string' ||
      typeof filter === 'number' ||
      typeof filter === 'boolean'
    ) {
      return filter;
    }

    const newFilter: NonNullable<QueryParserOptions['filter']> = {};

    for (const [key, value] of Object.entries(filter)) {
      if (key === '$like') {
        newFilter['$regex'] = value;
        newFilter['$options'] = 'i';
      } else if (Array.isArray(value)) {
        newFilter[key] = value.map((item) => this.parseMongoFilter(item));
      } else if (typeof value === 'object') {
        newFilter[key] = this.parseMongoFilter(value);
      } else {
        newFilter[key] = value;
      }
    }

    return newFilter;
  }

  protected parseMongoSelect(select: { [k: string]: boolean } | undefined): {
    [k: string]: 0 | 1;
  } {
    const newSelect: { [k: string]: 0 | 1 } = {};

    if (!select) {
      return newSelect;
    }

    for (const [key, value] of Object.entries(select)) {
      newSelect[key] = value ? 1 : 0;
    }

    return newSelect;
  }

  protected parseMongoSort(sort: { [k: string]: 'asc' | 'desc' } | undefined): {
    [k: string]: 0 | 1;
  } {
    const newSort: { [k: string]: 0 | 1 } = {};

    if (!sort) {
      return newSort;
    }

    for (const [key, value] of Object.entries(sort)) {
      newSort[key] = value === 'asc' ? 0 : 1;
    }

    return newSort;
  }
}
