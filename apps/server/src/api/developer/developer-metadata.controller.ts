import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { MetadataReviseSchema, RoleResourceType } from '@shukun/schema';

import { SourceService } from '../../core/source/source.service';
import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';

import { apiPrefix } from '../prefix';

import { MetadataPushDto } from './dto/metadata.dto';

@Controller(`${apiPrefix}/${RoleResourceType.Developer}/:orgName`)
@UseInterceptors(QueryResponseInterceptor)
export class DeveloperMetadataController {
  constructor(private readonly metadataService: SourceService) {}

  @Post('pull-metadatas')
  async pull(
    @Param('orgName') orgName: string,
  ): Promise<QueryResponse<Record<string, MetadataReviseSchema>>> {
    const metadatas = await this.metadataService.pull(orgName);
    return {
      value: metadatas,
    };
  }

  @Post('push-metadatas')
  async push(
    @Param('orgName') orgName: string,
    @Body() dto: MetadataPushDto,
  ): Promise<QueryResponse<null>> {
    await this.metadataService.push(orgName, dto.definition);
    return {
      value: null,
    };
  }
}
