import { IDString } from '@shukun/schema';

export interface SourceServiceCreateDto {
  [keyName: string]: unknown;
}

export type JsonModel<Model> = { _id: IDString } & Model;
