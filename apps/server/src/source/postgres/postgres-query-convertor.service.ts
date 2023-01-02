import { Injectable } from '@nestjs/common';
import {
  HttpQuerySchema,
  QueryFilter,
  QueryFilterExpression,
} from '@shukun/schema';
import { Knex } from 'knex';

@Injectable()
export class PostgresQueryConvertorService {
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

    return queryBuilder;
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
