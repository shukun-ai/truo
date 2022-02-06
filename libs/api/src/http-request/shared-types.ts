// TODO: should be extract a shared lib
export type IDString = string;

// TODO: should be extract a shared lib
export interface UnknownSourceModel {
  _id: IDString;
  [name: string]: unknown;
}

export interface QueryParams {
  limit?: number;
  skip?: number;
  count?: boolean;
  // TODO set correct type for filter
  filter?: unknown;
  sort?: string;
}

// TODO: should be extract a shared lib
export interface ApiResponseData<Value> {
  count?: number;
  value: Value;
}
