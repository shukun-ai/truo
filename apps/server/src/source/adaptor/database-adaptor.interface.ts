import { IDString } from '@shukun/api';
import { HttpQuerySchema, MetadataSchema } from '@shukun/schema';

import { SourceServiceCreateDto } from '../../app.type';

export interface DatabaseAdaptor<Model> {
  createOne(
    orgName: string,
    metadata: MetadataSchema,
    params: SourceServiceCreateDto,
  ): Promise<{ _id: IDString }>;
  updateOne(
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    params: SourceServiceCreateDto,
  ): Promise<void>;
  findOne(
    orgName: string,
    metadata: MetadataSchema,
    query: HttpQuerySchema,
  ): Promise<{ _id: IDString } & Model>;
  findAll(
    orgName: string,
    metadata: MetadataSchema,
    query: HttpQuerySchema,
  ): Promise<Array<{ _id: IDString } & Model>>;
  count(
    orgName: string,
    metadata: MetadataSchema,
    query: HttpQuerySchema,
  ): Promise<number>;
  deleteOne(
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
  ): Promise<void>;
  addToMany(
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    electronName: string,
    foreignId: IDString,
  ): Promise<void>;
  removeFromMany(
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    electronName: string,
    foreignId: IDString,
  ): Promise<void>;
  increase(
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    electronName: string,
    increment: number,
  ): Promise<void>;
}
