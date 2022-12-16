import { Injectable } from '@nestjs/common';
import { AddToManyDto, IncreaseDto, IDString } from '@shukun/api';
import { HttpQuerySchema } from '@shukun/schema';

import { SourceServiceCreateDto } from '../../app.type';
import { SecurityRequest } from '../../identity/utils/security-request';
import { SourceService } from '../../source/source.service';

@Injectable()
export class SourceResolverService {
  constructor(private readonly sourceService: SourceService<unknown>) {}

  async getMetadata(orgName: string, atomName: string) {
    return await this.sourceService.getMetadata(orgName, atomName);
  }

  async query(
    orgName: string,
    atomName: string,
    query: HttpQuerySchema,
  ): Promise<unknown> {
    return await this.sourceService.query(orgName, atomName, query);
  }

  async count(
    orgName: string,
    atomName: string,
    query: HttpQuerySchema,
  ): Promise<unknown> {
    return await this.sourceService.count(orgName, atomName, query);
  }

  async create(
    orgName: string,
    atomName: string,
    dto: SourceServiceCreateDto,
    request: SecurityRequest,
  ): Promise<{ _id: IDString }> {
    const value = await this.sourceService.createOne(
      orgName,
      atomName,
      dto,
      request.userId || null,
    );

    return {
      _id: value._id,
    };
  }

  async update(
    id: string,
    orgName: string,
    atomName: string,
    dto: SourceServiceCreateDto,
  ): Promise<null> {
    await this.sourceService.updateOne(id, orgName, atomName, dto);

    return null;
  }

  async addToMany(
    id: string,
    orgName: string,
    atomName: string,
    dto: AddToManyDto,
  ): Promise<null> {
    await this.sourceService.addToMany(
      id,
      orgName,
      atomName,
      dto.electronName,
      dto.foreignId,
    );

    return null;
  }

  async removeFromMany(
    id: string,
    orgName: string,
    atomName: string,
    dto: AddToManyDto,
  ): Promise<null> {
    await this.sourceService.removeFromMany(
      id,
      orgName,
      atomName,
      dto.electronName,
      dto.foreignId,
    );

    return null;
  }

  async increase(
    id: string,
    orgName: string,
    atomName: string,
    dto: IncreaseDto,
  ): Promise<null> {
    await this.sourceService.increase(
      id,
      orgName,
      atomName,
      dto.electronName,
      dto.increment,
    );

    return null;
  }

  async delete(id: string, orgName: string, atomName: string): Promise<null> {
    await this.sourceService.deleteOne(id, orgName, atomName);

    return null;
  }
}
