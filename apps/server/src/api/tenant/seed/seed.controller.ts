import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { RoleResourceType } from '@shukun/schema';

import { TenantService } from '../../../tenant/tenant.service';
import { QueryResponseInterceptor } from '../../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../../util/query/interfaces';

import { apiPrefix } from '../../prefix';

import { SeedCreateDto } from './seed.dto';

@Controller(`${apiPrefix}/${RoleResourceType.Tenant}/any/seeds`)
@UseInterceptors(QueryResponseInterceptor)
export class SeedController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async createNewOrg(
    @Body() createDto: SeedCreateDto,
  ): Promise<QueryResponse<null>> {
    await this.tenantService.createNewOrg(createDto);
    return {
      value: null,
    };
  }

  @Post('destroy')
  async destroyOrg(
    @Body() dto: { orgName: string },
  ): Promise<QueryResponse<null>> {
    await this.tenantService.destroyOrg(dto.orgName);
    return {
      value: null,
    };
  }
}
