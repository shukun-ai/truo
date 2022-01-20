import { QueryOptions } from 'mongoose-query-parser';

export interface QueryResponse<ValueType> {
  value: ValueType;
  count?: number;
  [k: string]: unknown;
}

export type QueryParserOptions = QueryOptions & { count?: boolean };
