import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { HttpQuerySchema, MetadataSchema } from '@shukun/schema';
import { isInteger } from 'lodash';

import { IDString, JsonModel, SourceServiceCreateDto } from '../app.type';
import { MetadataService } from '../core/metadata.service';

import { SourceDataAccessService } from './source-data-access.service';

import { SourceParamUtilService } from './source-param-util.service';

@Injectable()
export class SourceService<Model> {
  @Inject()
  private readonly metadataService!: MetadataService;

  @Inject()
  private readonly sourceParamUtilService!: SourceParamUtilService;

  @Inject()
  private readonly sourceDataAccessService!: SourceDataAccessService<Model>;

  async createOne(
    orgName: string,
    atomName: string,
    dto: SourceServiceCreateDto,
    ownerId: string | null,
  ): Promise<{ _id: IDString }> {
    const metadata = await this.metadataService.getMetadataByName(
      orgName,
      atomName,
    );

    const owner = ownerId ? { owner: ownerId } : null;

    const params = this.sourceParamUtilService.buildParams(metadata, {
      ...dto,
      ...owner,
    });

    const adaptor = await this.sourceDataAccessService.getAdaptor(
      orgName,
      metadata,
    );

    return await adaptor.createOne(params);
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

    const params = this.sourceParamUtilService.buildParams(metadata, dto);

    const adaptor = await this.sourceDataAccessService.getAdaptor(
      orgName,
      metadata,
    );

    return await adaptor.updateOne(id, params);
  }

  async findOne(
    orgName: string,
    atomName: string,
    query: HttpQuerySchema,
  ): Promise<JsonModel<Model>> {
    const metadata = await this.metadataService.getMetadataByName(
      orgName,
      atomName,
    );

    const adaptor = await this.sourceDataAccessService.getAdaptor(
      orgName,
      metadata,
    );

    return await adaptor.findOne(query);
  }

  async findAll(
    orgName: string,
    atomName: string,
    query: HttpQuerySchema,
  ): Promise<JsonModel<Model>[]> {
    const metadata = await this.metadataService.getMetadataByName(
      orgName,
      atomName,
    );

    const adaptor = await this.sourceDataAccessService.getAdaptor(
      orgName,
      metadata,
    );

    return await adaptor.findAll(query);
  }

  async count(
    orgName: string,
    atomName: string,
    query: HttpQuerySchema,
  ): Promise<number> {
    const metadata = await this.metadataService.getMetadataByName(
      orgName,
      atomName,
    );

    const adaptor = await this.sourceDataAccessService.getAdaptor(
      orgName,
      metadata,
    );

    return await adaptor.count(query);
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

    const adaptor = await this.sourceDataAccessService.getAdaptor(
      orgName,
      metadata,
    );

    return await adaptor.deleteOne(id);
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

    const adaptor = await this.sourceDataAccessService.getAdaptor(
      orgName,
      metadata,
    );

    return await adaptor.addToMany(id, electronName, foreignId);
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

    const adaptor = await this.sourceDataAccessService.getAdaptor(
      orgName,
      metadata,
    );

    return await adaptor.removeFromMany(id, electronName, foreignId);
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

    const adaptor = await this.sourceDataAccessService.getAdaptor(
      orgName,
      metadata,
    );

    return await adaptor.increase(id, electronName, increment);
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
