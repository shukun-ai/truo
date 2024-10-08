import { IDString } from '@shukun/schema';
import {
  DataSourceConnection,
  HttpQuerySchema,
  MetadataSchema,
} from '@shukun/schema';

import { SourceServiceCreateDto } from '../../app.type';

export interface DatabaseAdaptor<Model> {
  createOne(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    params: SourceServiceCreateDto,
    ownerId: IDString | null,
  ): Promise<{ _id: IDString }>;
  updateOne(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    params: SourceServiceCreateDto,
  ): Promise<void>;
  findOne(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    query: HttpQuerySchema,
  ): Promise<{ _id: IDString } & Model>;
  findAll(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    query: HttpQuerySchema,
  ): Promise<Array<{ _id: IDString } & Model>>;
  count(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    query: HttpQuerySchema,
  ): Promise<number>;
  deleteOne(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
  ): Promise<void>;
  addToMany(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    electronName: string,
    foreignId: IDString,
  ): Promise<void>;
  removeFromMany(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    electronName: string,
    foreignId: IDString,
  ): Promise<void>;
  increase(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    electronName: string,
    increment: number,
  ): Promise<void>;
}
