import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { EnvironmentSchema, RoleResourceType } from '@shukun/schema';

import { EnvironmentService } from '../../core/environment.service';
import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';

import { EnvironmentPushDto } from './dto/environment.dto';

@Controller(`/${RoleResourceType.Developer}/:orgName`)
@UseInterceptors(QueryResponseInterceptor)
export class DeveloperEnvironmentController {
  constructor(private readonly environmentService: EnvironmentService) {}

  @Post('pull-environments')
  async pull(
    @Param('orgName') orgName: string,
  ): Promise<QueryResponse<Record<string, EnvironmentSchema>>> {
    const environments = await this.environmentService.pull(orgName);
    return {
      value: environments,
    };
  }

  @Post('push-environments')
  async push(
    @Param('orgName') orgName: string,
    @Body() dto: EnvironmentPushDto,
  ): Promise<QueryResponse<null>> {
    await this.environmentService.push(orgName, dto.definition);
    return {
      value: null,
    };
  }
}
