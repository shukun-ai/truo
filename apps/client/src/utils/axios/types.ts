export interface QueryParams {
  limit?: number;
  skip?: number;
  count?: boolean;
  // TODO set correct type for filter
  filter?: unknown;
  sort?: string;
}

export interface ApiResponseData<Value> {
  count?: number;
  value: Value;
}
