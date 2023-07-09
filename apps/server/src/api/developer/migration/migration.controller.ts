import { Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleResourceType, MigrationDifference } from '@shukun/schema';

import { MigrationService } from '../../../migration/migration.service';
import { QueryResponseInterceptor } from '../../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../../util/query/interfaces';

@Controller(`/${RoleResourceType.Developer}/:orgName/migration`)
@UseInterceptors(QueryResponseInterceptor)
@ApiBearerAuth()
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) {}

  @Post('preview')
  async preview(
    @Param('orgName') orgName: string,
  ): Promise<QueryResponse<MigrationDifference>> {
    const difference = await this.migrationService.preview(orgName);

    return {
      value: difference,
    };
  }

  @Post('execute')
  async execute(
    @Param('orgName') orgName: string,
  ): Promise<QueryResponse<null>> {
    await this.migrationService.execute(orgName);

    return {
      value: null,
    };
  }
}
