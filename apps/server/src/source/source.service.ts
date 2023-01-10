import { Injectable } from '@nestjs/common';
import { IDString } from '@shukun/schema';
import { HttpQuerySchema, MetadataSchema, OperatorId } from '@shukun/schema';

import { JsonModel, SourceServiceCreateDto } from '../app.type';

import { SourceForeignQueryService } from './source-foreign-query.service';
import { SourceFoundationService } from './source-foundation.service';

@Injectable()
export class SourceService<Model> {
  constructor(
    private readonly sourceFoundationService: SourceFoundationService<Model>,
    private readonly sourceForeignQueryService: SourceForeignQueryService<Model>,
  ) {}

  async query(
    orgName: string,
    atomName: string,
    query: HttpQuerySchema,
  ): Promise<JsonModel<Model>[]> {
    query.filter = await this.sourceForeignQueryService.prepareForeignQuery(
      orgName,
      atomName,
      query.filter ?? {},
    );

    return await this.sourceFoundationService.findAll(orgName, atomName, query);
  }

  async count(
    orgName: string,
    atomName: string,
    query: HttpQuerySchema,
  ): Promise<number> {
    query.filter = await this.sourceForeignQueryService.prepareForeignQuery(
      orgName,
      atomName,
      query.filter ?? {},
    );

    return await this.sourceFoundationService.count(orgName, atomName, query);
  }

  async queryWithCount(
    orgName: string,
    atomName: string,
    query: HttpQuerySchema,
  ): Promise<{ value: JsonModel<Model>[]; count?: number }> {
    query.filter = await this.sourceForeignQueryService.prepareForeignQuery(
      orgName,
      atomName,
      query.filter ?? {},
    );

    const value = await this.sourceFoundationService.findAll(
      orgName,
      atomName,
      query,
    );
    const count = query.count
      ? await this.sourceFoundationService.count(orgName, atomName, query)
      : undefined;

    return {
      value,
      count,
    };
  }

  async createOne(
    orgName: string,
    atomName: string,
    dto: SourceServiceCreateDto,
    ownerId: OperatorId,
  ): Promise<{ _id: IDString }> {
    return await this.sourceFoundationService.createOne(
      orgName,
      atomName,
      dto,
      ownerId,
    );
  }

  async updateOne(
    id: string,
    orgName: string,
    atomName: string,
    dto: SourceServiceCreateDto,
    // @remark add modifierId for recording audit logs later
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    modifierId: OperatorId,
  ): Promise<void> {
    return await this.sourceFoundationService.updateOne(
      id,
      orgName,
      atomName,
      dto,
    );
  }

  /**
   * @deprecated
   */
  async findOne(
    orgName: string,
    atomName: string,
    query: HttpQuerySchema,
  ): Promise<JsonModel<Model>> {
    return await this.sourceFoundationService.findOne(orgName, atomName, query);
  }

  /**
   * @deprecated
   */
  async findAll(
    orgName: string,
    atomName: string,
    query: HttpQuerySchema,
  ): Promise<JsonModel<Model>[]> {
    return await this.sourceFoundationService.findAll(orgName, atomName, query);
  }

  async deleteOne(
    id: string,
    orgName: string,
    atomName: string,
  ): Promise<void> {
    return await this.sourceFoundationService.deleteOne(id, orgName, atomName);
  }

  async addToMany(
    id: string,
    orgName: string,
    atomName: string,
    electronName: string,
    foreignId: IDString,
  ): Promise<void> {
    return await this.sourceFoundationService.addToMany(
      id,
      orgName,
      atomName,
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
    return await this.sourceFoundationService.addToMany(
      id,
      orgName,
      atomName,
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
    return await this.sourceFoundationService.increase(
      id,
      orgName,
      atomName,
      electronName,
      increment,
    );
  }

  async getMetadata(
    orgName: string,
    atomName: string,
  ): Promise<MetadataSchema> {
    return await this.sourceFoundationService.getMetadata(orgName, atomName);
  }
}
