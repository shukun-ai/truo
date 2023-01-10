import { Inject, Injectable } from '@nestjs/common';
import { HttpQuerySchema } from '@shukun/schema';

import { IDString, OperatorId, SourceServiceCreateDto } from '../../app.type';
import { SecurityService } from '../../identity/security.service';
import { SecurityRequest } from '../../identity/utils/security-request';
import { SourceService } from '../../source/source.service';
import { QueryResponse } from '../../util/query/interfaces';

import { AddToManyDto } from './dto/add-to-many.dto';
import { IncreaseDto } from './dto/increase.dto';
import { SourceAccessControlService } from './source-access-control.service';

@Injectable()
export class SourceOperationService {
  @Inject()
  private readonly sourceService!: SourceService<unknown>;

  @Inject()
  private readonly sourceAccessControlService!: SourceAccessControlService;

  @Inject()
  private readonly securityService!: SecurityService;

  async getMetadata(orgName: string, atomName: string) {
    const value = await this.sourceService.getMetadata(orgName, atomName);
    return {
      value,
    };
  }

  async query(
    orgName: string,
    atomName: string,
    query: HttpQuerySchema,
    request: SecurityRequest,
  ): Promise<QueryResponse<unknown[]>> {
    if (request.userId) {
      const isOwnRead = await this.securityService.isOwnRead(
        orgName,
        atomName,
        request.userId,
      );
      if (isOwnRead) {
        query = {
          ...query,
          filter: { $and: [{ owner: request.userId }, query.filter ?? {}] },
        };
      }
    }

    const { value, count } = await this.sourceService.queryWithCount(
      orgName,
      atomName,
      query,
    );

    return {
      value,
      count,
    };
  }

  async create(
    orgName: string,
    atomName: string,
    createDto: SourceServiceCreateDto,
    ownerId: OperatorId,
  ): Promise<QueryResponse<{ _id: IDString }>> {
    const dto = await this.sourceAccessControlService.filterDto(
      orgName,
      atomName,
      createDto,
    );

    const value = await this.sourceService.createOne(
      orgName,
      atomName,
      dto,
      ownerId,
    );

    return {
      value: {
        _id: value._id,
      },
    };
  }

  async update(
    id: string,
    orgName: string,
    atomName: string,
    createDto: SourceServiceCreateDto,
    modifierId: OperatorId,
  ): Promise<QueryResponse<null>> {
    const dto = await this.sourceAccessControlService.filterDto(
      orgName,
      atomName,
      createDto,
    );

    await this.sourceService.updateOne(id, orgName, atomName, dto, modifierId);

    return {
      value: null,
    };
  }

  async addToMany(
    id: string,
    orgName: string,
    atomName: string,
    dto: AddToManyDto,
  ): Promise<QueryResponse<null>> {
    await this.sourceService.addToMany(
      id,
      orgName,
      atomName,
      dto.electronName,
      dto.foreignId,
    );

    return {
      value: null,
    };
  }

  async removeFromMany(
    id: string,
    orgName: string,
    atomName: string,
    dto: AddToManyDto,
  ): Promise<QueryResponse<null>> {
    await this.sourceService.removeFromMany(
      id,
      orgName,
      atomName,
      dto.electronName,
      dto.foreignId,
    );

    return {
      value: null,
    };
  }

  async increase(
    id: string,
    orgName: string,
    atomName: string,
    dto: IncreaseDto,
  ): Promise<QueryResponse<null>> {
    await this.sourceService.increase(
      id,
      orgName,
      atomName,
      dto.electronName,
      dto.increment,
    );

    return {
      value: null,
    };
  }

  async delete(
    id: string,
    orgName: string,
    atomName: string,
  ): Promise<QueryResponse<null>> {
    await this.sourceService.deleteOne(id, orgName, atomName);

    return {
      value: null,
    };
  }
}
