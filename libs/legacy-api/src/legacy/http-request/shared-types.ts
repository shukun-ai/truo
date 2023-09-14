import { HttpQuerySchema, IDString } from '@shukun/schema';

// TODO: should be extract a shared lib
export interface UnknownSourceModel {
  _id: IDString;
  [name: string]: unknown;
}

export type QueryParams = HttpQuerySchema;

// TODO: should be extract a shared lib
export interface ApiResponseData<Value> {
  count?: number;
  value: Value;
}

export type AddToManyDto = {
  electronName: string;
  foreignId: string;
};

export type IncreaseDto = {
  electronName: string;
  increment: number;
};
