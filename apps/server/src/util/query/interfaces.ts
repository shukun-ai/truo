import { QueryOptions } from 'mongoose-query-parser';

export interface QueryResponse<ValueType> {
  value: ValueType;
  count?: number;
  [k: string]: unknown;
}

/**
 * @deprecated
 */
export type QueryParserOptions = QueryOptions & { count?: boolean };

/**
 * @deprecated
 */
export type QueryFilter = Record<
  string,
  | string
  | number
  | boolean
  | {
      $eq?: string | number | boolean;
      $ne?: string | number | boolean;
      $gt?: string | number;
      $gte?: string | number;
      $lt?: string | number;
      $lte?: string | number;
      $foreign?: {
        filter: QueryFilter;
      } & Omit<QueryParserOptions, 'filter'>;
      $in?: (string | number)[];
      $nin?: (string | number)[];
      $exists?: boolean;
      $regex?: string;
      $options?: string;
      $and?: QueryFilter[];
      $or?: QueryFilter[];
    }
>;
