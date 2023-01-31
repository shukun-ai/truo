import { Injectable, NotFoundException } from '@nestjs/common';
import { IDString } from '@shukun/schema';
import {
  DataSourceConnection,
  HttpQuerySchema,
  MetadataSchema,
} from '@shukun/schema';
import {
  Document,
  Model as MongooseModel,
  UpdateWithAggregationPipeline,
} from 'mongoose';

import { DB_DEFAULT_LIMIT, DB_DEFAULT_SKIP } from '../../app.constant';

import { SourceServiceCreateDto } from '../../app.type';

import { DatabaseAdaptor } from '../adaptor/database-adaptor.interface';
import { SourceFieldFilterService } from '../source-field-filter.service';

import { MongoQueryConvertorService } from './mongo-query-convertor.service';
import { MongooseConnectionService } from './mongoose-connection.service';
import { MongoExceptionHandlerService } from './monogo-exception-handler.service';

@Injectable()
export class MongoAdaptorService<Model> implements DatabaseAdaptor<Model> {
  constructor(
    private readonly mongooseConnectionService: MongooseConnectionService,
    private readonly mongoQueryConvertorService: MongoQueryConvertorService,
    private readonly sourceFieldFilterService: SourceFieldFilterService,
    private readonly mongoExceptionHandlerService: MongoExceptionHandlerService,
  ) {}

  private async getAtomModel(
    orgName: string,
    metadata: MetadataSchema,
  ): Promise<MongooseModel<Model & Document>> {
    const atomModel = await this.mongooseConnectionService.getAtomModel<Model>(
      orgName,
      metadata,
    );

    return atomModel;
  }

  private sourceToJSON(
    value: Model & Document,
    metadata: MetadataSchema,
  ): { _id: IDString } & Model {
    const json = JSON.parse(JSON.stringify(value.toJSON()));
    return this.sourceFieldFilterService.filter(json, metadata);
  }

  async createOne(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    params: SourceServiceCreateDto,
  ): Promise<{ _id: IDString }> {
    const atomModel = await this.getAtomModel(orgName, metadata);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entity = new atomModel(params as any);

    try {
      await entity.save();
      return this.sourceToJSON(entity, metadata);
    } catch (error) {
      throw this.mongoExceptionHandlerService.handle(error, metadata);
    }
  }

  async updateOne(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    params: SourceServiceCreateDto,
  ): Promise<void> {
    const atomModel = await this.getAtomModel(orgName, metadata);
    await atomModel.findByIdAndUpdate(
      id,
      params as unknown as UpdateWithAggregationPipeline,
    );
  }

  /**
   * @deprecated please use findAll instead
   */
  async findOne(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    query: HttpQuerySchema,
  ): Promise<{ _id: IDString } & Model> {
    const atomModel = await this.getAtomModel(orgName, metadata);
    const mongoQuery = this.mongoQueryConvertorService.parseMongoQuery(query);

    const value = await atomModel
      .findOne(mongoQuery.filter)
      .select(mongoQuery.select)
      .skip(mongoQuery.skip || DB_DEFAULT_SKIP)
      .sort(mongoQuery.sort)
      .exec();

    if (!value) {
      throw new NotFoundException(
        `We did not find specific source in findOne, and source name is ${atomModel.name}.`,
      );
    }

    const result = this.sourceToJSON(value, metadata);

    return result;
  }

  async findAll(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    query: HttpQuerySchema,
  ): Promise<Array<{ _id: IDString } & Model>> {
    const mongoQuery = this.mongoQueryConvertorService.parseMongoQuery(query);
    const atomModel = await this.getAtomModel(orgName, metadata);
    const value = await atomModel
      .find(mongoQuery.filter)
      .select(mongoQuery.select)
      .skip(mongoQuery.skip ?? DB_DEFAULT_SKIP)
      .limit(mongoQuery.limit ?? DB_DEFAULT_LIMIT)
      .sort(mongoQuery.sort)
      .exec();

    const result = value.map((value) => this.sourceToJSON(value, metadata));

    return result;
  }

  async count(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    query: HttpQuerySchema,
  ): Promise<number> {
    const mongoQuery = this.mongoQueryConvertorService.parseMongoQuery(query);
    const atomModel = await this.getAtomModel(orgName, metadata);
    const value = await atomModel.find(mongoQuery.filter).countDocuments();
    return value;
  }

  async deleteOne(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
  ): Promise<void> {
    const atomModel = await this.getAtomModel(orgName, metadata);

    const model = await atomModel.findById(id).exec();

    if (!model) {
      throw new NotFoundException(
        `We did not find specific source in deleteOne, and source name is ${atomModel.name}.`,
      );
    }

    await model.deleteOne();
  }

  async addToMany(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    electronName: string,
    foreignId: IDString,
  ): Promise<void> {
    const atomModel = await this.getAtomModel(orgName, metadata);

    const operator = {
      $addToSet: { [electronName]: foreignId },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await atomModel.findByIdAndUpdate(id, operator as any);
  }

  async removeFromMany(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    electronName: string,
    foreignId: IDString,
  ): Promise<void> {
    const atomModel = await this.getAtomModel(orgName, metadata);

    const operator = {
      $pull: { [electronName]: foreignId },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await atomModel.findByIdAndUpdate(id, operator as any);
  }

  async increase(
    dataSourceConnection: DataSourceConnection,
    orgName: string,
    metadata: MetadataSchema,
    id: IDString,
    electronName: string,
    increment: number,
  ): Promise<void> {
    const atomModel = await this.getAtomModel(orgName, metadata);

    const operator = {
      $inc: { [electronName]: increment },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await atomModel.findByIdAndUpdate(id, operator as any);
  }
}
