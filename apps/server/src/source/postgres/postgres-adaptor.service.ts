import { Injectable } from '@nestjs/common';
import { IDString } from '@shukun/api';
import { HttpQuerySchema, MetadataSchema } from '@shukun/schema';
import { ObjectId } from 'mongodb';

import { SourceServiceCreateDto } from '../../app.type';

import { DatabaseAdaptor } from '../adaptor/database-adaptor.interface';

import { PostgresConnectionService } from './postgres-connection.service';
import { PostgresElectronConvertorService } from './postgres-electron-convertor.service';
import { PostgresQueryConvertorService } from './postgres-query-convertor.service';

@Injectable()
export class PostgresAdaptorService<Model> implements DatabaseAdaptor<Model> {
  constructor(
    private readonly postgresConnectionService: PostgresConnectionService,
    private readonly postgresQueryConvertorService: PostgresQueryConvertorService,
    private readonly postgresElectronConvertorService: PostgresElectronConvertorService<Model>,
  ) {}

  async createOne(
    orgName: string,
    metadata: MetadataSchema,
    params: SourceServiceCreateDto,
  ): Promise<{ _id: IDString }> {
    const tableName = this.postgresConnectionService.getTableName(
      orgName,
      metadata,
    );
    const client = await this.postgresConnectionService.getClient(
      orgName,
      metadata,
    );
    const id = new ObjectId().toString();
    const updatedAt = new Date();
    const createdAt = updatedAt;
    await client(tableName).insert({
      ...params,
      _id: id,
      createdAt,
      updatedAt,
    });
    return { _id: id };
  }

  async updateOne(
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    params: SourceServiceCreateDto,
  ): Promise<void> {
    const tableName = this.postgresConnectionService.getTableName(
      orgName,
      metadata,
    );
    const client = await this.postgresConnectionService.getClient(
      orgName,
      metadata,
    );
    const updatedAt = new Date();
    await client(tableName)
      .where('_id', id)
      .update({ ...params, updatedAt });
  }

  async findOne(
    orgName: string,
    metadata: MetadataSchema,
    query: HttpQuerySchema,
  ): Promise<{ _id: IDString } & Model> {
    const tableName = this.postgresConnectionService.getTableName(
      orgName,
      metadata,
    );
    const client = await this.postgresConnectionService.getClient(
      orgName,
      metadata,
    );

    let queryBuilder = this.postgresQueryConvertorService.parseQuery(
      client,
      query.filter,
    );
    queryBuilder = this.postgresQueryConvertorService.parseSelect(
      queryBuilder,
      query.select,
    );

    const value = await queryBuilder.from(tableName).first();

    return this.postgresElectronConvertorService.convertAfterQueryForOne(
      value,
      metadata,
    );
  }

  async findAll(
    orgName: string,
    metadata: MetadataSchema,
    query: HttpQuerySchema,
  ): Promise<Array<{ _id: IDString } & Model>> {
    const tableName = this.postgresConnectionService.getTableName(
      orgName,
      metadata,
    );
    const client = await this.postgresConnectionService.getClient(
      orgName,
      metadata,
    );

    let queryBuilder = this.postgresQueryConvertorService.parseQuery(
      client,
      query.filter,
    );
    queryBuilder = this.postgresQueryConvertorService.parseSelect(
      queryBuilder,
      query.select,
    );

    const value = await queryBuilder.from(tableName);

    return this.postgresElectronConvertorService.convertAfterQuery(
      value,
      metadata,
    );
  }

  async count(
    orgName: string,
    metadata: MetadataSchema,
    query: HttpQuerySchema,
  ): Promise<number> {
    const tableName = this.postgresConnectionService.getTableName(
      orgName,
      metadata,
    );
    const client = await this.postgresConnectionService.getClient(
      orgName,
      metadata,
    );
    const value = await this.postgresQueryConvertorService
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
    const tableName = this.postgresConnectionService.getTableName(
      orgName,
      metadata,
    );
    const client = await this.postgresConnectionService.getClient(
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
    const tableName = this.postgresConnectionService.getTableName(
      orgName,
      metadata,
    );
    const client = await this.postgresConnectionService.getClient(
      orgName,
      metadata,
    );
    await client(tableName).where('_id', id).increment(electronName, increment);
  }
}
