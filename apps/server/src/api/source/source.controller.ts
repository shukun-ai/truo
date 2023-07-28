import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  Inject,
  Param,
  Req,
} from '@nestjs/common';
import { HttpQuerySchema, IDString, RoleResourceType } from '@shukun/schema';

import { SourceServiceCreateDto } from '../../app.type';
import { SecurityRequest } from '../../identity/utils/security-request';
import { ParsedHttpQuery } from '../../util/query/decorators/parsed-http-query.decorator';
import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';

import { apiPrefix } from '../prefix';

import { AddToManyDto } from './dto/add-to-many.dto';
import { IncreaseDto } from './dto/increase.dto';
import { SourceOperationService } from './source-operation.service';

@Controller(`${apiPrefix}/${RoleResourceType.Source}/:orgName/:atomName`)
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
      request.userId ?? null,
    );
  }

  @Post(':id/update')
  async updateOne(
    @Param('id') id: string,
    @Param('orgName') orgName: string,
    @Param('atomName') atomName: string,
    @Body() createDto: SourceServiceCreateDto,
    @Req() request: SecurityRequest,
  ): Promise<QueryResponse<null>> {
    return await this.sourceOperationService.update(
      id,
      orgName,
      atomName,
      createDto,
      request.userId ?? null,
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
}
