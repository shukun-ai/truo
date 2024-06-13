import { Controller, Get, UseInterceptors, Param, Req } from '@nestjs/common';
import { RoleResourceType, SystemUserProfile } from '@shukun/schema';

import { SecurityRequest } from '../../../identity/utils/security-request';
import { SystemUserService } from '../../../system-source/system-user.service';
import { QueryResponseInterceptor } from '../../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../../util/query/interfaces';
import { apiPrefix } from '../../prefix';

@Controller(`${apiPrefix}/${RoleResourceType.Public}/:orgName/profile`)
@UseInterceptors(QueryResponseInterceptor)
export class ProfileController {
  constructor(private readonly systemUserService: SystemUserService) {}

  @Get()
  async index(
    @Param('orgName') orgName: string,
    @Req() req: SecurityRequest,
  ): Promise<QueryResponse<SystemUserProfile | null>> {
    if (!req.userId) {
      return {
        value: null,
      };
    }

    const user = await this.systemUserService.findOne(orgName, req.userId);

    return {
      value: {
        userId: user._id,
        orgName: orgName,
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
      },
    };
  }
}
