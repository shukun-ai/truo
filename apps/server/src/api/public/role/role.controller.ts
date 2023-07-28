import {
  Controller,
  Get,
  UseInterceptors,
  Inject,
  Param,
} from '@nestjs/common';
import { RoleResourceType } from '@shukun/schema';

import { RoleService } from '../../../core/role.service';

import { QueryResponseInterceptor } from '../../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../../util/query/interfaces';
import { apiPrefix } from '../../prefix';

@Controller(`${apiPrefix}/${RoleResourceType.Public}/:orgName/roles`)
@UseInterceptors(QueryResponseInterceptor)
export class RoleController {
  @Inject()
  private readonly roleService!: RoleService;

  @Get()
  async index(
    @Param('orgName') orgName: string,
  ): Promise<QueryResponse<{ name: string; label: string }[]>> {
    const roles = await this.roleService.findAll(orgName);

    const value = roles.map(({ name, label }) => ({ name, label }));

    return {
      value,
    };
  }
}
