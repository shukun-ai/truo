import { Injectable } from '@nestjs/common';
import { IDString } from '@shukun/api';
import { HttpQuerySchema, MetadataSchema } from '@shukun/schema';
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
    orgName: string,
    metadata: MetadataSchema,
    params: SourceServiceCreateDto,
  ): Promise<{ _id: IDString }> {
    const tableName = this.knexConnectionService.getTableName(
      orgName,
      metadata,
    );
    const client = await this.knexConnectionService.getClient(
      orgName,
      metadata,
    );
    const id = new ObjectId().toString();
    const updatedAt = new Date();
    const createdAt = updatedAt;

    try {
      await client(tableName).insert({
        ...params,
        _id: id,
        createdAt,
        updatedAt,
      });
      return { _id: id };
    } catch (error) {
      throw this.knexExceptionHandlerService.handle(error);
    }
  }

  async updateOne(
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    params: SourceServiceCreateDto,
  ): Promise<void> {
    const tableName = this.knexConnectionService.getTableName(
      orgName,
      metadata,
    );
    const client = await this.knexConnectionService.getClient(
      orgName,
      metadata,
    );
    const updatedAt = new Date();
    try {
      await client(tableName)
        .where('_id', id)
        .update({ ...params, updatedAt });
    } catch (error) {
      throw this.knexExceptionHandlerService.handle(error);
    }
  }

  async findOne(
    orgName: string,
    metadata: MetadataSchema,
    query: HttpQuerySchema,
  ): Promise<{ _id: IDString } & Model> {
    const tableName = this.knexConnectionService.getTableName(
      orgName,
      metadata,
    );
    const client = await this.knexConnectionService.getClient(
      orgName,
      metadata,
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
      value,
      metadata,
    );
  }

  async findAll(
    orgName: string,
    metadata: MetadataSchema,
    query: HttpQuerySchema,
  ): Promise<Array<{ _id: IDString } & Model>> {
    const tableName = this.knexConnectionService.getTableName(
      orgName,
      metadata,
    );
    const client = await this.knexConnectionService.getClient(
      orgName,
      metadata,
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

    return this.knexElectronConvertorService.convertAfterQuery(value, metadata);
  }

  async count(
    orgName: string,
    metadata: MetadataSchema,
    query: HttpQuerySchema,
  ): Promise<number> {
    const tableName = this.knexConnectionService.getTableName(
      orgName,
      metadata,
    );
    const client = await this.knexConnectionService.getClient(
      orgName,
      metadata,
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
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
  ): Promise<void> {
    const tableName = this.knexConnectionService.getTableName(
      orgName,
      metadata,
    );
    const client = await this.knexConnectionService.getClient(
      orgName,
      metadata,
    );
    await client(tableName).where('_id', id).delete();
  }

  async addToMany(
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    electronName: string,
    foreignId: IDString,
  ): Promise<void> {
    throw new Error();
  }

  async removeFromMany(
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    electronName: string,
    foreignId: IDString,
  ): Promise<void> {
    throw new Error();
  }

  async increase(
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    electronName: string,
    increment: number,
  ): Promise<void> {
    const tableName = this.knexConnectionService.getTableName(
      orgName,
      metadata,
    );
    const client = await this.knexConnectionService.getClient(
      orgName,
      metadata,
    );
    await client(tableName).where('_id', id).increment(electronName, increment);
  }
}
