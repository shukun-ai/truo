import {
  Controller,
  Get,
  UseInterceptors,
  Inject,
  Param,
  Req,
} from '@nestjs/common';
import { AccessInternalRoles } from '../../identity/interfaces';
import { SecurityRequest } from '../../identity/utils/security-request';

import { SecurityService } from '../../identity/security.service';
import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';
import { ResourceType } from '../api.type';

@Controller(`${ResourceType.Public}/:orgName/grant-roles`)
@UseInterceptors(QueryResponseInterceptor)
export class GrantRoleController {
  @Inject()
  private readonly securityService!: SecurityService;

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

    const roleNames = await this.securityService.getRoleNames(
      orgName,
      req.userId,
    );

    return {
      value: roleNames,
    };
  }
}
