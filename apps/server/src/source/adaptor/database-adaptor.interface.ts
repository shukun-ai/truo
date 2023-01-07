import { IDString } from '@shukun/api';
import {
  DataSourceConnection,
  HttpQuerySchema,
  MetadataSchema,
} from '@shukun/schema';

import { SourceServiceCreateDto } from '../../app.type';

export interface DatabaseAdaptor<Model> {
  createOne(
    dataSourceConnection: DataSourceConnection | null,
    orgName: string,
    metadata: MetadataSchema,
    params: SourceServiceCreateDto,
  ): Promise<{ _id: IDString }>;
  updateOne(
    dataSourceConnection: DataSourceConnection | null,
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    params: SourceServiceCreateDto,
  ): Promise<void>;
  findOne(
    dataSourceConnection: DataSourceConnection | null,
    orgName: string,
    metadata: MetadataSchema,
    query: HttpQuerySchema,
  ): Promise<{ _id: IDString } & Model>;
  findAll(
    dataSourceConnection: DataSourceConnection | null,
    orgName: string,
    metadata: MetadataSchema,
    query: HttpQuerySchema,
  ): Promise<Array<{ _id: IDString } & Model>>;
  count(
    dataSourceConnection: DataSourceConnection | null,
    orgName: string,
    metadata: MetadataSchema,
    query: HttpQuerySchema,
  ): Promise<number>;
  deleteOne(
    dataSourceConnection: DataSourceConnection | null,
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
  ): Promise<void>;
  addToMany(
    dataSourceConnection: DataSourceConnection | null,
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    electronName: string,
    foreignId: IDString,
  ): Promise<void>;
  removeFromMany(
    dataSourceConnection: DataSourceConnection | null,
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    electronName: string,
    foreignId: IDString,
  ): Promise<void>;
  increase(
    dataSourceConnection: DataSourceConnection | null,
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    electronName: string,
    increment: number,
  ): Promise<void>;
}
