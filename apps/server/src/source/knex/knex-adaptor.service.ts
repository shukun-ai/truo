import { Injectable } from '@nestjs/common';
import { IDString } from '@shukun/schema';
import {
  DataSourceConnection,
  HttpQuerySchema,
  MetadataSchema,
} from '@shukun/schema';
import { ObjectId } from 'mongodb';

import { SourceServiceCreateDto } from '../../app.type';

import { DatabaseAdaptor } from '../adaptor/database-adaptor.interface';

import { KnexConnectionService } from './knex-connection.service';
import { KnexElectronConvertorService } from './knex-electron-convertor.service';
import { KnexExceptionHandlerService } from './knex-exception-handler.service';
import { KnexQueryConvertorService } from './knex-query-convertor.service';

@Injectable()
export class KnexAdaptorService<Model> implements DatabaseAdaptor<Model> {
  constructor(
    private readonly knexConnectionService: KnexConnectionService,
    private readonly knexQueryConvertorService: KnexQueryConvertorService,
    private readonly knexElectronConvertorService: KnexElectronConvertorService<Model>,
    private readonly knexExceptionHandlerService: KnexExceptionHandlerService,
  ) {}

  async createOne(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    params: SourceServiceCreateDto,
    ownerId: IDString | null,
  ): Promise<{ _id: IDString }> {
    const tableName = this.knexConnectionService.getTableName(
      orgName,
      metadata,
      dataSourceConnection,
    );
    const client = await this.knexConnectionService.getClient(
      dataSourceConnection,
    );
    const id = new ObjectId().toString();
    const updatedAt = new Date();
    const createdAt = updatedAt;
    const owner = ownerId;

    try {
      await client(tableName).insert({
        ...params,
        _id: id,
        createdAt,
        updatedAt,
        owner,
      });
      return { _id: id };
    } catch (error) {
      throw this.knexExceptionHandlerService.handle(error, metadata);
    }
  }

  async updateOne(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    params: SourceServiceCreateDto,
  ): Promise<void> {
    const tableName = this.knexConnectionService.getTableName(
      orgName,
      metadata,
      dataSourceConnection,
    );
    const client = await this.knexConnectionService.getClient(
      dataSourceConnection,
    );
    const updatedAt = new Date();
    try {
      await client(tableName)
        .where('_id', id)
        .update({ ...params, updatedAt });
    } catch (error) {
      throw this.knexExceptionHandlerService.handle(error, metadata);
    }
  }

  async findOne(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    query: HttpQuerySchema,
  ): Promise<{ _id: IDString } & Model> {
    const tableName = this.knexConnectionService.getTableName(
      orgName,
      metadata,
      dataSourceConnection,
    );
    const client = await this.knexConnectionService.getClient(
      dataSourceConnection,
    );

    let queryBuilder = this.knexQueryConvertorService.parseQuery(
      client,
      query.filter,
    );
    queryBuilder = this.knexQueryConvertorService.parseSelect(
      queryBuilder,
      query.select,
    );
    queryBuilder = this.knexQueryConvertorService.parseSort(
      queryBuilder,
      query.sort,
    );
    queryBuilder = this.knexQueryConvertorService.parseSkip(
      queryBuilder,
      query.skip,
    );

    const value = await queryBuilder.from(tableName).first();

    return this.knexElectronConvertorService.convertAfterQueryForOne(
      dataSourceConnection,
      value,
      metadata,
    );
  }

  async findAll(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    query: HttpQuerySchema,
  ): Promise<Array<{ _id: IDString } & Model>> {
    const tableName = this.knexConnectionService.getTableName(
      orgName,
      metadata,
      dataSourceConnection,
    );
    const client = await this.knexConnectionService.getClient(
      dataSourceConnection,
    );

    let queryBuilder = this.knexQueryConvertorService.parseQuery(
      client,
      query.filter,
    );
    queryBuilder = this.knexQueryConvertorService.parseSelect(
      queryBuilder,
      query.select,
    );
    queryBuilder = this.knexQueryConvertorService.parseSort(
      queryBuilder,
      query.sort,
    );
    queryBuilder = this.knexQueryConvertorService.parseSkip(
      queryBuilder,
      query.skip,
    );
    queryBuilder = this.knexQueryConvertorService.parseLimit(
      queryBuilder,
      query.limit,
    );

    const value = await queryBuilder.from(tableName);

    return this.knexElectronConvertorService.convertAfterQuery(
      dataSourceConnection,
      value,
      metadata,
    );
  }

  async count(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    query: HttpQuerySchema,
  ): Promise<number> {
    const tableName = this.knexConnectionService.getTableName(
      orgName,
      metadata,
      dataSourceConnection,
    );
    const client = await this.knexConnectionService.getClient(
      dataSourceConnection,
    );
    const value = await this.knexQueryConvertorService
      .parseQuery(client, query.filter)
      .from(tableName)
      .count();

    const rawCount = value[0].count;
    const count = typeof rawCount === 'string' ? parseInt(rawCount) : rawCount;
    return count;
  }

  async deleteOne(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
  ): Promise<void> {
    const tableName = this.knexConnectionService.getTableName(
      orgName,
      metadata,
      dataSourceConnection,
    );
    const client = await this.knexConnectionService.getClient(
      dataSourceConnection,
    );
    await client(tableName).where('_id', id).delete();
  }

  async addToMany(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    electronName: string,
    foreignId: IDString,
  ): Promise<void> {
    throw new Error();
  }

  async removeFromMany(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    electronName: string,
    foreignId: IDString,
  ): Promise<void> {
    throw new Error();
  }

  async increase(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    electronName: string,
    increment: number,
  ): Promise<void> {
    const tableName = this.knexConnectionService.getTableName(
      orgName,
      metadata,
      dataSourceConnection,
    );
    const client = await this.knexConnectionService.getClient(
      dataSourceConnection,
    );
    await client(tableName).where('_id', id).increment(electronName, increment);
  }
}
