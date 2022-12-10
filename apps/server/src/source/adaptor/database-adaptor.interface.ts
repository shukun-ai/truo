import { IDString } from '@shukun/api';
import { HttpQuerySchema, MetadataSchema } from '@shukun/schema';

import { SourceServiceCreateDto } from '../../app.type';

export interface DatabaseAdaptor<Model> {
  initAtom(orgName: string, metadata: MetadataSchema): Promise<this>;
  createOne(params: SourceServiceCreateDto): Promise<{ _id: IDString }>;
  updateOne(id: IDString, params: SourceServiceCreateDto): Promise<void>;
  findOne(query: HttpQuerySchema): Promise<{ _id: IDString } & Model>;
  findAll(query: HttpQuerySchema): Promise<Array<{ _id: IDString } & Model>>;
  count(query: HttpQuerySchema): Promise<number>;
  deleteOne(id: IDString): Promise<void>;
  addToMany(
    id: IDString,
    electronName: string,
    foreignId: IDString,
  ): Promise<void>;
  removeFromMany(
    id: IDString,
    electronName: string,
    foreignId: IDString,
  ): Promise<void>;
  increase(
    id: IDString,
    electronName: string,
    increment: number,
  ): Promise<void>;
}
