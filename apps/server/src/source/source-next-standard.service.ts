import { Inject, Injectable } from '@nestjs/common';
import { HttpQuerySchema } from '@shukun/schema';

import { QueryParserOptions } from '../util/query/interfaces';

import { SourceService } from './source.service';

@Injectable()
export class SourceNextStandardService<Model> {
  @Inject()
  private readonly sourceService!: SourceService<Model>;

  async getMetadata(orgName: string, atomName: string) {
    return this.sourceService.getMetadata(orgName, atomName);
  }

  async findAll(orgName: string, atomName: string, query: HttpQuerySchema) {
    return this.sourceService.findAll(
      orgName,
      atomName,
      this.parseMongoQuery(query),
    );
  }

  async count(orgName: string, atomName: string, query: HttpQuerySchema) {
    return this.sourceService.count(
      orgName,
      atomName,
      this.parseMongoQuery(query),
    );
  }

  parseMongoQuery(query: HttpQuerySchema): QueryParserOptions {
    const mongoQuery: QueryParserOptions = {
      filter: this.parseMongoFilter(query.filter),
      select: query.select ? this.parseMongoSelect(query.select) : undefined,
      sort: query.sort ? this.parseMongoSort(query.sort) : undefined,
      limit: query.limit,
      skip: query.skip,
      count: query.count,
    };

    return mongoQuery;
  }

  parseMongoFilter(
    filter: HttpQuerySchema['filter'],
  ): QueryParserOptions['filter'] {
    if (!filter) {
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

  parseMongoSelect(select: { [k: string]: boolean }): { [k: string]: 0 | 1 } {
    const newSelect: { [k: string]: 0 | 1 } = {};

    for (const [key, value] of Object.entries(select)) {
      newSelect[key] = value ? 1 : 0;
    }

    return newSelect;
  }

  parseMongoSort(sort: { [k: string]: 'asc' | 'desc' }): {
    [k: string]: 0 | 1;
  } {
    const newSort: { [k: string]: 0 | 1 } = {};

    for (const [key, value] of Object.entries(sort)) {
      newSort[key] = value === 'asc' ? 0 : 1;
    }

    return newSort;
  }
}
