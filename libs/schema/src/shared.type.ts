export type IDString = string;

export type OperatorId = IDString | null;

export interface UnknownSourceModel {
  _id: IDString;
  [name: string]: unknown;
}

export interface ApiResponseData<Value> {
  count?: number;
  value: Value;
}
