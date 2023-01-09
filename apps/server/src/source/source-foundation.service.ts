import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpQuerySchema, MetadataSchema } from '@shukun/schema';
import { isInteger } from 'lodash';

import { IDString, JsonModel, SourceServiceCreateDto } from '../app.type';
import { DataSourceService } from '../core/data-source.service';
import { MetadataService } from '../core/metadata.service';

import { SourceDataAccessService } from './source-data-access.service';
import { SourceDtoConstraintService } from './source-dto-constraint.service';

import { SourceParamUtilService } from './source-param-util.service';

@Injectable()
export class SourceFoundationService<Model> {
  constructor(
    private readonly metadataService: MetadataService,
    private readonly sourceParamUtilService: SourceParamUtilService,
    private readonly sourceDtoConstraintService: SourceDtoConstraintService,
    private readonly sourceDataAccessService: SourceDataAccessService<Model>,
    private readonly dataSourceService: DataSourceService,
  ) {}

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
    const dataSourceConnection = await this.dataSourceService.findOne(
      orgName,
      atomName,
    );

    const owner = ownerId ? { owner: ownerId } : null;

    const params = this.sourceParamUtilService.buildParams(
      dataSourceConnection,
      metadata,
      {
        ...dto,
        ...owner,
      },
    );

    this.sourceDtoConstraintService.validateCreateConstraint(metadata, params);

    const adaptor = await this.sourceDataAccessService.getAdaptor(
      dataSourceConnection,
    );

    return await adaptor.createOne(
      dataSourceConnection,
      orgName,
      metadata,
      params,
    );
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
    const dataSourceConnection = await this.dataSourceService.findOne(
      orgName,
      atomName,
    );

    const params = this.sourceParamUtilService.buildParams(
      dataSourceConnection,
      metadata,
      dto,
    );

    this.sourceDtoConstraintService.validateUpdateConstraint(metadata, params);

    const adaptor = await this.sourceDataAccessService.getAdaptor(
      dataSourceConnection,
    );

    return await adaptor.updateOne(
      dataSourceConnection,
      orgName,
      metadata,
      id,
      params,
    );
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
    const dataSourceConnection = await this.dataSourceService.findOne(
      orgName,
      atomName,
    );

    const adaptor = await this.sourceDataAccessService.getAdaptor(
      dataSourceConnection,
    );

    return await adaptor.findOne(
      dataSourceConnection,
      orgName,
      metadata,
      query,
    );
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
    const dataSourceConnection = await this.dataSourceService.findOne(
      orgName,
      atomName,
    );

    const adaptor = await this.sourceDataAccessService.getAdaptor(
      dataSourceConnection,
    );

    return await adaptor.findAll(
      dataSourceConnection,
      orgName,
      metadata,
      query,
    );
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
    const dataSourceConnection = await this.dataSourceService.findOne(
      orgName,
      atomName,
    );

    const adaptor = await this.sourceDataAccessService.getAdaptor(
      dataSourceConnection,
    );

    return await adaptor.count(dataSourceConnection, orgName, metadata, query);
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
    const dataSourceConnection = await this.dataSourceService.findOne(
      orgName,
      atomName,
    );

    const adaptor = await this.sourceDataAccessService.getAdaptor(
      dataSourceConnection,
    );

    return await adaptor.deleteOne(dataSourceConnection, orgName, metadata, id);
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
    const dataSourceConnection = await this.dataSourceService.findOne(
      orgName,
      atomName,
    );

    const adaptor = await this.sourceDataAccessService.getAdaptor(
      dataSourceConnection,
    );

    return await adaptor.addToMany(
      dataSourceConnection,
      orgName,
      metadata,
      id,
      electronName,
      foreignId,
    );
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
    const dataSourceConnection = await this.dataSourceService.findOne(
      orgName,
      atomName,
    );

    const adaptor = await this.sourceDataAccessService.getAdaptor(
      dataSourceConnection,
    );

    return await adaptor.removeFromMany(
      dataSourceConnection,
      orgName,
      metadata,
      id,
      electronName,
      foreignId,
    );
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
    const dataSourceConnection = await this.dataSourceService.findOne(
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
      dataSourceConnection,
    );

    return await adaptor.increase(
      dataSourceConnection,
      orgName,
      metadata,
      id,
      electronName,
      increment,
    );
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
