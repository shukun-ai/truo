import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MetadataSchema } from '@shukun/schema';
import { isInteger } from 'lodash';

import { DB_DEFAULT_LIMIT, DB_DEFAULT_SKIP } from '../app.constant';
import { IDString, JsonModel, SourceServiceCreateDto } from '../app.type';
import { MetadataService } from '../core/metadata.service';
import { QueryParserOptions } from '../util/query/interfaces';

import { sourceToJSON } from './source-json';
import { SourceSchemaUtilService } from './source-schema-util.service';

@Injectable()
export class SourceService<Model> {
  @Inject()
  private readonly metadataService: MetadataService;

  @Inject()
  private readonly sourceSchemaUtilService: SourceSchemaUtilService;

  async createOne(
    orgName: string,
    atomName: string,
    dto: SourceServiceCreateDto,
    ownerId: string | null,
  ): Promise<JsonModel<Model>> {
    const metadata = await this.metadataService.getMetadataByName(
      orgName,
      atomName,
    );

    const AtomModel = await this.sourceSchemaUtilService.getAtomModel<Model>(
      orgName,
      metadata,
    );

    const owner = ownerId ? { owner: ownerId } : null;

    const params = this.sourceSchemaUtilService.buildParams(metadata, {
      ...dto,
      ...owner,
    });

    const entity = new AtomModel(params);
    await entity.save({ checkKeys: false }); // forbid error when example: 'email.$'

    const result = sourceToJSON(entity);
    return result;
  }

  async updateOne(
    id: string,
    orgName: string,
    atomName: string,
    dto: SourceServiceCreateDto,
  ): Promise<void> {
    const metadata = await this.metadataService.getMetadataByName(
      orgName,
      atomName,
    );

    const AtomModel = await this.sourceSchemaUtilService.getAtomModel(
      orgName,
      metadata,
    );

    const params = this.sourceSchemaUtilService.buildParams(metadata, dto);

    await AtomModel.findByIdAndUpdate(id, params as any);
  }

  async findOne(
    orgName: string,
    atomName: string,
    query: QueryParserOptions,
  ): Promise<JsonModel<Model>> {
    const metadata = await this.metadataService.getMetadataByName(
      orgName,
      atomName,
    );

    const AtomModel = await this.sourceSchemaUtilService.getAtomModel<Model>(
      orgName,
      metadata,
    );

    const value = await AtomModel.findOne(query.filter)
      .select(query.select)
      .skip(query.skip || DB_DEFAULT_SKIP)
      .sort(query.sort)
      .exec();

    if (!value) {
      throw new NotFoundException(
        `We did not find specific source in findOne, and source name is ${atomName}.`,
      );
    }

    const result = sourceToJSON(value);
    return result;
  }

  async findAll(
    orgName: string,
    atomName: string,
    query: QueryParserOptions,
  ): Promise<JsonModel<Model>[]> {
    const metadata = await this.metadataService.getMetadataByName(
      orgName,
      atomName,
    );

    const AtomModel = await this.sourceSchemaUtilService.getAtomModel<Model>(
      orgName,
      metadata,
    );

    const value = await AtomModel.find(query.filter)
      .select(query.select)
      .skip(query.skip || DB_DEFAULT_SKIP)
      .limit(query.limit || DB_DEFAULT_LIMIT)
      .sort(query.sort)
      .exec();

    const result = value.map((value) => sourceToJSON(value));
    return result;
  }

  async count(
    orgName: string,
    atomName: string,
    query: QueryParserOptions,
  ): Promise<number> {
    const metadata = await this.metadataService.getMetadataByName(
      orgName,
      atomName,
    );

    const AtomModel = await this.sourceSchemaUtilService.getAtomModel<Model>(
      orgName,
      metadata,
    );

    const value = await AtomModel.find(query.filter).countDocuments();
    return value;
  }

  async deleteOne(
    id: string,
    orgName: string,
    atomName: string,
  ): Promise<void> {
    const metadata = await this.metadataService.getMetadataByName(
      orgName,
      atomName,
    );

    const AtomModel = await this.sourceSchemaUtilService.getAtomModel<Model>(
      orgName,
      metadata,
    );

    const model = await AtomModel.findById(id).exec();

    if (!model) {
      throw new NotFoundException(
        `We did not find specific source in deleteOne, and source name is ${atomName}.`,
      );
    }

    await model.deleteOne();
  }

  async addToMany(
    id: string,
    orgName: string,
    atomName: string,
    electronName: string,
    foreignId: IDString,
  ): Promise<void> {
    const metadata = await this.validateManyToManyElectron(
      orgName,
      atomName,
      electronName,
      foreignId,
    );

    const AtomModel = await this.sourceSchemaUtilService.getAtomModel(
      orgName,
      metadata,
    );

    await AtomModel.findByIdAndUpdate(id, {
      $addToSet: { [electronName]: foreignId },
    });
  }

  async removeFromMany(
    id: string,
    orgName: string,
    atomName: string,
    electronName: string,
    foreignId: IDString,
  ) {
    const metadata = await this.validateManyToManyElectron(
      orgName,
      atomName,
      electronName,
      foreignId,
    );

    const AtomModel = await this.sourceSchemaUtilService.getAtomModel(
      orgName,
      metadata,
    );

    await AtomModel.findByIdAndUpdate(id, {
      $pull: { [electronName]: foreignId },
    });
  }

  async increase(
    id: string,
    orgName: string,
    atomName: string,
    electronName: string,
    increment: number,
  ): Promise<void> {
    const metadata = await this.metadataService.getMetadataByName(
      orgName,
      atomName,
    );

    const electron = metadata.electrons.find(
      (electron) => electron.name === electronName,
    );

    if (
      !electron ||
      !['Currency', 'Float', 'Integer'].includes(electron.fieldType)
    ) {
      throw new BadRequestException(
        'We did not find specified electron in increase method or the electron field type is not one of Currency, Float, or Integer',
      );
    }

    if (electron.fieldType === 'Integer' && !isInteger(increment)) {
      throw new BadRequestException(
        'We only support integer increment increased on Integer field.',
      );
    }

    const AtomModel = await this.sourceSchemaUtilService.getAtomModel(
      orgName,
      metadata,
    );

    await AtomModel.findByIdAndUpdate(id, {
      $inc: { [electronName]: increment },
    });
  }

  async getMetadata(
    orgName: string,
    atomName: string,
  ): Promise<MetadataSchema> {
    const metadata = await this.metadataService.getMetadataByName(
      orgName,
      atomName,
    );

    return metadata;
  }

  private async validateManyToManyElectron(
    orgName: string,
    atomName: string,
    electronName: string,
    foreignId: IDString,
  ): Promise<MetadataSchema> {
    const metadata = await this.metadataService.getMetadataByName(
      orgName,
      atomName,
    );

    const electron = metadata.electrons.find(
      (electron) =>
        electron.name === electronName && electron.fieldType === 'ManyToMany',
    );

    if (!electron || !electron.referenceTo) {
      throw new BadRequestException(
        'We did not find specified electron or the electron is not ManyToMany.',
      );
    }

    const foreignEntity = await this.findOne(orgName, electron.referenceTo, {
      filter: {
        _id: foreignId,
      },
    });

    if (!foreignEntity) {
      throw new BadRequestException('We did not find specified foreignEntity');
    }

    return metadata;
  }
}
