import { Controller, Get, UseInterceptors, Param, Req } from '@nestjs/common';

import { RoleResourceType, AccessInternalRoles } from '@shukun/schema';

import { RoleGeneratorService } from '../../../identity/role-generator.service';
import { SecurityRequest } from '../../../identity/utils/security-request';

import { QueryResponseInterceptor } from '../../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../../util/query/interfaces';
import { apiPrefix } from '../../prefix';

@Controller(`${apiPrefix}/${RoleResourceType.Public}/:orgName/grant-roles`)
@UseInterceptors(QueryResponseInterceptor)
export class GrantRoleController {
  constructor(private readonly roleGeneratorService: RoleGeneratorService) {}

  @Get()
  async index(
    @Param('orgName') orgName: string,
    @Req() req: SecurityRequest,
  ): Promise<QueryResponse<string[]>> {
    if (!req.userId) {
      return {
        value: [AccessInternalRoles.Anonymous],
      };
    }

    const roleNames = await this.roleGeneratorService.getRoleNames(
      orgName,
      req.userId,
    );

    return {
      value: roleNames,
    };
  }
}
