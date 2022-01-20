import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  Inject,
  Param,
  Put,
  Delete,
  Req,
} from '@nestjs/common';

import { IDString } from '../../app.type';
import { SecurityService } from '../../identity/security.service';
import { SecurityRequest } from '../../identity/utils/security-request';
import { SourceService } from '../../source/source.service';
import { ParsedQuery } from '../../util/query/decorators/parsed-query.decorator';
import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryParserOptions, QueryResponse } from '../../util/query/interfaces';
import { ResourceType } from '../api.type';

import { AddToManyDto } from './dto/add-to-many.dto';
import { IncreaseDto } from './dto/increase.dto';
import { SourceAccessControlService } from './source-access-control.service';

@Controller(`/${ResourceType.Source}/:orgName/:atomName`)
@UseInterceptors(QueryResponseInterceptor)
export class SourceController {
  @Inject()
  private readonly sourceService: SourceService<any>;

  @Inject()
  private readonly sourceAccessControlService: SourceAccessControlService;

  @Inject()
  private readonly securityService: SecurityService;

  @Get('metadata')
  async metadata(
    @Param('orgName') orgName: string,
    @Param('atomName') atomName: string,
  ) {
    const value = await this.sourceService.getMetadata(orgName, atomName);
    return {
      value,
    };
  }

  @Get()
  async index(
    @Param('orgName') orgName: string,
    @Param('atomName') atomName: string,
    @ParsedQuery() query: QueryParserOptions,
    @Req() request: SecurityRequest,
  ): Promise<QueryResponse<any>> {
    if (request.userId) {
      const isOwnRead = await this.securityService.isOwnRead(
        orgName,
        atomName,
        request.userId,
      );
      if (isOwnRead) {
        query = {
          ...query,
          filter: { $and: [{ owner: request.userId }, query.filter] },
        };
      }
    }

    const value = await this.sourceService.findAll(orgName, atomName, query);
    const count = query.count
      ? await this.sourceService.count(orgName, atomName, query)
      : undefined;

    return {
      value,
      count,
    };
  }

  @Post()
  async create(
    @Param('orgName') orgName: string,
    @Param('atomName') atomName: string,
    @Body() createDto: any,
    @Req() request: SecurityRequest,
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
      request.userId || null,
    );

    return {
      value: {
        _id: value._id,
      },
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Param('orgName') orgName: string,
    @Param('atomName') atomName: string,
    @Body() createDto: any,
  ): Promise<QueryResponse<null>> {
    const dto = await this.sourceAccessControlService.filterDto(
      orgName,
      atomName,
      createDto,
    );

    await this.sourceService.updateOne(id, orgName, atomName, dto);

    return {
      value: null,
    };
  }

  @Put(':id/add-to-many')
  async addToMany(
    @Param('id') id: string,
    @Param('orgName') orgName: string,
    @Param('atomName') atomName: string,
    @Body() dto: AddToManyDto,
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

  @Put(':id/remove-from-many')
  async removeFromMany(
    @Param('id') id: string,
    @Param('orgName') orgName: string,
    @Param('atomName') atomName: string,
    @Body() dto: AddToManyDto,
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

  @Put(':id/increase')
  async increase(
    @Param('id') id: string,
    @Param('orgName') orgName: string,
    @Param('atomName') atomName: string,
    @Body() dto: IncreaseDto,
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

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Param('orgName') orgName: string,
    @Param('atomName') atomName: string,
  ): Promise<QueryResponse<null>> {
    await this.sourceService.deleteOne(id, orgName, atomName);

    return {
      value: null,
    };
  }
}
