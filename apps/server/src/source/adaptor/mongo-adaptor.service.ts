import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IDString } from '@shukun/api';
import { MetadataSchema } from '@shukun/schema';
import {
  Document,
  Model as MongooseModel,
  UpdateWithAggregationPipeline,
} from 'mongoose';

import { DB_DEFAULT_LIMIT, DB_DEFAULT_SKIP } from '../../app.constant';

import { SourceServiceCreateDto } from '../../app.type';
import { QueryParserOptions } from '../../util/query/interfaces';

import { DatabaseAdaptor } from './database-adaptor.interface';
import { MongooseConnectionService } from './mongoose-connection.service';

@Injectable()
export class MongoAdaptorService<Model> implements DatabaseAdaptor<Model> {
  @Inject()
  private readonly mongooseConnectionService!: MongooseConnectionService;

  private atom: MongooseModel<Model & Document> | null = null;

  async initAtom(orgName: string, metadata: MetadataSchema): Promise<this> {
    this.atom = await this.mongooseConnectionService.getAtomModel<Model>(
      orgName,
      metadata,
    );
    return this;
  }

  getAtom(): MongooseModel<Model & Document> {
    if (!this.atom) {
      throw new InternalServerErrorException('Did not init atom.');
    }
    return this.atom;
  }

  sourceToJSON(value: Model & Document): { _id: IDString } & Model {
    const json = JSON.parse(JSON.stringify(value.toJSON()));
    return json;
  }

  async createOne(params: SourceServiceCreateDto): Promise<{ _id: IDString }> {
    const atom = this.getAtom();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const entity = new atom(params);
    await entity.save({ checkKeys: false }); // forbid error when example: 'email.$'
    const result = this.sourceToJSON(entity);
    return result;
  }

  async updateOne(id: IDString, params: SourceServiceCreateDto): Promise<void> {
    await this.getAtom().findByIdAndUpdate(
      id,
      params as unknown as UpdateWithAggregationPipeline,
    );
  }

  async findOne(query: QueryParserOptions): Promise<{ _id: IDString } & Model> {
    const atom = this.getAtom();

    const value = await atom
      .findOne(query.filter)
      .select(query.select)
      .skip(query.skip || DB_DEFAULT_SKIP)
      .sort(query.sort)
      .exec();

    if (!value) {
      throw new NotFoundException(
        `We did not find specific source in findOne, and source name is ${atom.name}.`,
      );
    }

    const result = this.sourceToJSON(value);

    return result;
  }

  async findAll(
    query: QueryParserOptions,
  ): Promise<Array<{ _id: IDString } & Model>> {
    const value = await this.getAtom()
      .find(query.filter)
      .select(query.select)
      .skip(query.skip || DB_DEFAULT_SKIP)
      .limit(query.limit || DB_DEFAULT_LIMIT)
      .sort(query.sort)
      .exec();

    const result = value.map((value) => this.sourceToJSON(value));

    return result;
  }

  async count(query: QueryParserOptions): Promise<number> {
    const value = await this.getAtom().find(query.filter).countDocuments();
    return value;
  }

  async deleteOne(id: IDString): Promise<void> {
    const atom = this.getAtom();

    const model = await atom.findById(id).exec();

    if (!model) {
      throw new NotFoundException(
        `We did not find specific source in deleteOne, and source name is ${atom.name}.`,
      );
    }

    await model.deleteOne();
  }

  async addToMany(
    id: IDString,
    electronName: string,
    foreignId: IDString,
  ): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await this.getAtom().findByIdAndUpdate(id, {
      $addToSet: { [electronName]: foreignId },
    });
  }

  async removeFromMany(
    id: IDString,
    electronName: string,
    foreignId: IDString,
  ): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await this.getAtom().findByIdAndUpdate(id, {
      $pull: { [electronName]: foreignId },
    });
  }

  async increase(
    id: IDString,
    electronName: string,
    increment: number,
  ): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await this.getAtom().findByIdAndUpdate(id, {
      $inc: { [electronName]: increment },
    });
  }
}
