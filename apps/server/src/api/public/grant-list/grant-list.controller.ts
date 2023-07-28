import { Controller, Get, UseInterceptors, Param } from '@nestjs/common';
import { RoleResourceType, RoleSchema } from '@shukun/schema';

import { RoleService } from '../../../core/role.service';

import { QueryResponseInterceptor } from '../../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../../util/query/interfaces';
import { apiPrefix } from '../../prefix';

@Controller(`${apiPrefix}/${RoleResourceType.Public}/:orgName/grant-list`)
@UseInterceptors(QueryResponseInterceptor)
export class GrantListController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async index(
    @Param('orgName') orgName: string,
  ): Promise<QueryResponse<RoleSchema[]>> {
    const value = await this.roleService.findAll(orgName);
    return { value };
  }
}
