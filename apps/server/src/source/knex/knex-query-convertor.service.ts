import { Injectable } from '@nestjs/common';
import {
  HttpQuerySchema,
  QueryFilter,
  QueryFilterExpression,
} from '@shukun/schema';
import { Knex } from 'knex';

import { DB_DEFAULT_LIMIT, DB_DEFAULT_SKIP } from '../../app.constant';

@Injectable()
export class KnexQueryConvertorService {
  parseQuery(
    client: Knex,
    filter: HttpQuerySchema['filter'],
  ): Knex.QueryBuilder {
    return client.where((queryBuilder) =>
      this.buildQueryFilterClause(queryBuilder, filter ?? {}),
    );
  }

  parseSelect(
    queryBuilder: Knex.QueryBuilder,
    select: HttpQuerySchema['select'],
  ) {
    if (!select) {
      return queryBuilder;
    }

    for (const [column, isSelect] of Object.entries(select)) {
      if (isSelect) {
        queryBuilder.select(column);
      }
    }

    // Please always select _id with compatible with MongoDB.
    queryBuilder.select('_id');

    return queryBuilder;
  }

  parseSort(queryBuilder: Knex.QueryBuilder, sort: HttpQuerySchema['sort']) {
    if (!sort) {
      return queryBuilder;
    }

    const orderBys = [];

    for (const [column, sortString] of Object.entries(sort)) {
      orderBys.push({ column, order: sortString });
    }

    return queryBuilder.orderBy(orderBys);
  }

  parseLimit(queryBuilder: Knex.QueryBuilder, limit: HttpQuerySchema['limit']) {
    if (limit === 0) {
      return queryBuilder;
    }

    if (!limit) {
      return queryBuilder.limit(DB_DEFAULT_LIMIT);
    }

    return queryBuilder.limit(limit);
  }

  parseSkip(queryBuilder: Knex.QueryBuilder, skip: HttpQuerySchema['skip']) {
    if (!skip) {
      return queryBuilder.offset(DB_DEFAULT_SKIP);
    }

    return queryBuilder.offset(skip);
  }

  buildQueryFilterClause(
    queryBuilder: Knex.QueryBuilder,
    clause: QueryFilter,
  ): Knex.QueryBuilder {
    for (const [key, value] of Object.entries(clause)) {
      if (key === '$and') {
        this.buildAndClause(queryBuilder, value);
      } else if (key === '$or') {
        this.buildOrClause(queryBuilder, value);
      } else {
        this.buildObjectClause(queryBuilder, key, value);
      }
    }

    return queryBuilder;
  }

  buildObjectClause(
    queryBuilder: Knex.QueryBuilder,
    expressionKey: string,
    expression: QueryFilterExpression,
  ): Knex.QueryBuilder {
    if (
      typeof expression === 'string' ||
      typeof expression === 'number' ||
      typeof expression === 'boolean'
    ) {
      return this.buildEqClause(queryBuilder, expressionKey, expression);
    }

    if (typeof expression === 'object') {
      for (const [key, value] of Object.entries(expression)) {
        switch (key) {
          case '$and':
            this.buildAndClause(queryBuilder, value as any);
            break;
          case '$or':
            this.buildOrClause(queryBuilder, value as any);
            break;
          case '$eq':
            this.buildEqClause(queryBuilder, expressionKey, value as any);
            break;
          case '$ne':
            this.buildNeqClause(queryBuilder, expressionKey, value as any);
            break;
          case '$gt':
            this.buildGtClause(queryBuilder, expressionKey, value as any);
            break;
          case '$gte':
            this.buildGteClause(queryBuilder, expressionKey, value as any);
            break;
          case '$lt':
            this.buildLtClause(queryBuilder, expressionKey, value as any);
            break;
          case '$lte':
            this.buildLteClause(queryBuilder, expressionKey, value as any);
            break;
          case '$in':
            this.buildInClause(queryBuilder, expressionKey, value as any);
            break;
          case '$nin':
            this.buildNinClause(queryBuilder, expressionKey, value as any);
            break;
          case '$like':
            this.buildLikeClause(queryBuilder, expressionKey, value as any);
            break;
        }
      }

      return queryBuilder;
    }

    throw new Error('no');
  }

  buildEqClause(
    queryBuilder: Knex.QueryBuilder,
    key: string,
    value: string | number | boolean,
  ): Knex.QueryBuilder {
    return queryBuilder.where(key, value);
  }

  buildNeqClause(
    queryBuilder: Knex.QueryBuilder,
    key: string,
    value: string | number | boolean,
  ): Knex.QueryBuilder {
    return queryBuilder.whereNot(key, value);
  }

  buildGtClause(
    queryBuilder: Knex.QueryBuilder,
    key: string,
    value: string | number | boolean,
  ): Knex.QueryBuilder {
    return queryBuilder.where(key, '>', value);
  }

  buildGteClause(
    queryBuilder: Knex.QueryBuilder,
    key: string,
    value: string | number | boolean,
  ): Knex.QueryBuilder {
    return queryBuilder.where(key, '>=', value);
  }

  buildLtClause(
    queryBuilder: Knex.QueryBuilder,
    key: string,
    value: string | number | boolean,
  ): Knex.QueryBuilder {
    return queryBuilder.where(key, '<', value);
  }

  buildLteClause(
    queryBuilder: Knex.QueryBuilder,
    key: string,
    value: string | number | boolean,
  ): Knex.QueryBuilder {
    return queryBuilder.where(key, '<=', value);
  }

  buildInClause(
    queryBuilder: Knex.QueryBuilder,
    key: string,
    value: unknown[],
  ): Knex.QueryBuilder {
    return queryBuilder.whereIn(key as any, value as any);
  }

  buildNinClause(
    queryBuilder: Knex.QueryBuilder,
    key: string,
    value: unknown[],
  ): Knex.QueryBuilder {
    return queryBuilder.whereNotIn(key as any, value as any);
  }

  buildLikeClause(
    queryBuilder: Knex.QueryBuilder,
    key: string,
    value: string,
  ): Knex.QueryBuilder {
    return queryBuilder.whereLike(key, '%' + value + '%');
  }

  buildAndClause(
    queryBuilder: Knex.QueryBuilder,
    clauses: QueryFilter[],
  ): Knex.QueryBuilder {
    clauses.forEach((clause) => {
      queryBuilder.andWhere((subQueryBuilder) =>
        this.buildQueryFilterClause(subQueryBuilder, clause),
      );
    });

    return queryBuilder;
  }

  buildOrClause(
    queryBuilder: Knex.QueryBuilder,
    clauses: QueryFilter[],
  ): Knex.QueryBuilder {
    clauses.forEach((clause) => {
      queryBuilder.orWhere((subQueryBuilder) =>
        this.buildQueryFilterClause(subQueryBuilder, clause),
      );
    });

    return queryBuilder;
  }
}
