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
import { HttpQuerySchema, RoleResourceType } from '@shukun/schema';

import { IDString, SourceServiceCreateDto } from '../../app.type';
import { SecurityRequest } from '../../identity/utils/security-request';
import { ParsedHttpQuery } from '../../util/query/decorators/parsed-http-query.decorator';
import { ParsedQuery } from '../../util/query/decorators/parsed-query.decorator';
import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryParserOptions, QueryResponse } from '../../util/query/interfaces';

import { AddToManyDto } from './dto/add-to-many.dto';
import { IncreaseDto } from './dto/increase.dto';
import { SourceOperationService } from './source-operation.service';

@Controller(`/${RoleResourceType.Source}/:orgName/:atomName`)
@UseInterceptors(QueryResponseInterceptor)
export class SourceController {
  @Inject()
  private readonly sourceOperationService!: SourceOperationService;

  @Post('any/metadata')
  async getMetadata(
    @Param('orgName') orgName: string,
    @Param('atomName') atomName: string,
  ) {
    return await this.sourceOperationService.getMetadata(orgName, atomName);
  }

  // @deprecated
  @Get('metadata')
  async metadata(
    @Param('orgName') orgName: string,
    @Param('atomName') atomName: string,
  ) {
    return await this.sourceOperationService.getMetadata(orgName, atomName);
  }

  @Post('any/query')
  async query(
    @Param('orgName') orgName: string,
    @Param('atomName') atomName: string,
    @ParsedHttpQuery() query: HttpQuerySchema,
    @Req() request: SecurityRequest,
  ): Promise<QueryResponse<unknown>> {
    return await this.sourceOperationService.query(
      orgName,
      atomName,
      query,
      request,
    );
  }

  // @deprecated
  @Get()
  async index(
    @Param('orgName') orgName: string,
    @Param('atomName') atomName: string,
    @ParsedQuery() query: QueryParserOptions,
    @Req() request: SecurityRequest,
  ): Promise<QueryResponse<unknown>> {
    return await this.sourceOperationService.query(
      orgName,
      atomName,
      query,
      request,
    );
  }

  @Post('any/create')
  async createOne(
    @Param('orgName') orgName: string,
    @Param('atomName') atomName: string,
    @Body() createDto: SourceServiceCreateDto,
    @Req() request: SecurityRequest,
  ): Promise<QueryResponse<{ _id: IDString }>> {
    return await this.sourceOperationService.create(
      orgName,
      atomName,
      createDto,
      request,
    );
  }

  // @deprecated
  @Post()
  async create(
    @Param('orgName') orgName: string,
    @Param('atomName') atomName: string,
    @Body() createDto: SourceServiceCreateDto,
    @Req() request: SecurityRequest,
  ): Promise<QueryResponse<{ _id: IDString }>> {
    return await this.sourceOperationService.create(
      orgName,
      atomName,
      createDto,
      request,
    );
  }

  @Post(':id/update')
  async updateOne(
    @Param('id') id: string,
    @Param('orgName') orgName: string,
    @Param('atomName') atomName: string,
    @Body() createDto: SourceServiceCreateDto,
  ): Promise<QueryResponse<null>> {
    return await this.sourceOperationService.update(
      id,
      orgName,
      atomName,
      createDto,
    );
  }

  // @deprecated
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Param('orgName') orgName: string,
    @Param('atomName') atomName: string,
    @Body() createDto: SourceServiceCreateDto,
  ): Promise<QueryResponse<null>> {
    return await this.sourceOperationService.update(
      id,
      orgName,
      atomName,
      createDto,
    );
  }

  @Post(':id/add-to-many')
  async addToMany(
    @Param('id') id: string,
    @Param('orgName') orgName: string,
    @Param('atomName') atomName: string,
    @Body() dto: AddToManyDto,
  ): Promise<QueryResponse<null>> {
    return await this.sourceOperationService.addToMany(
      id,
      orgName,
      atomName,
      dto,
    );
  }

  @Post(':id/remove-from-many')
  async removeFromMany(
    @Param('id') id: string,
    @Param('orgName') orgName: string,
    @Param('atomName') atomName: string,
    @Body() dto: AddToManyDto,
  ): Promise<QueryResponse<null>> {
    return await this.sourceOperationService.removeFromMany(
      id,
      orgName,
      atomName,
      dto,
    );
  }

  @Post(':id/increase')
  async increase(
    @Param('id') id: string,
    @Param('orgName') orgName: string,
    @Param('atomName') atomName: string,
    @Body() dto: IncreaseDto,
  ): Promise<QueryResponse<null>> {
    return await this.sourceOperationService.increase(
      id,
      orgName,
      atomName,
      dto,
    );
  }

  @Post(':id/delete')
  async deleteOne(
    @Param('id') id: string,
    @Param('orgName') orgName: string,
    @Param('atomName') atomName: string,
  ): Promise<QueryResponse<null>> {
    return await this.sourceOperationService.delete(id, orgName, atomName);
  }

  // @deprecated
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Param('orgName') orgName: string,
    @Param('atomName') atomName: string,
  ): Promise<QueryResponse<null>> {
    return await this.sourceOperationService.delete(id, orgName, atomName);
  }
}
