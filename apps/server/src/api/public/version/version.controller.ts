import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RoleResourceType } from '@shukun/schema';

import { QueryResponseInterceptor } from '../../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../../util/query/interfaces';
import { apiPrefix } from '../../prefix';

@Controller(`${apiPrefix}/${RoleResourceType.Public}/:orgName/versions`)
@UseInterceptors(QueryResponseInterceptor)
export class VersionController {
  constructor(private readonly configService: ConfigService) {}
  @Get()
  async index(): Promise<QueryResponse<{ version: string; build: string }>> {
    return {
      value: {
        version: this.configService.get('version.version') || '',
        build: this.configService.get('version.commitHash') || '',
      },
    };
  }
}
