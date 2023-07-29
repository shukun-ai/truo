export interface QueryResponse<ValueType> {
  value: ValueType;
  count?: number;
  [k: string]: unknown;
}

/**
 * @deprecated
 * @remark The type is from mongoose-query-parser
 */
export type QueryParserOptions = {
  filter: any;
  sort?: string | any;
  limit?: number;
  skip?: number;
  select?: string | any;
  populate?: string | any;
  count?: boolean;
};
