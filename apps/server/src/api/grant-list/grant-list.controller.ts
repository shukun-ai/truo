import {
  Controller,
  Get,
  UseInterceptors,
  Inject,
  Param,
  BadRequestException,
} from '@nestjs/common';

import { GrantList } from '../../identity/interfaces';
import { SecurityService } from '../../identity/security.service';
import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';
import { ResourceType } from '../api.type';

@Controller(`${ResourceType.Public}/:orgName/grant-list`)
@UseInterceptors(QueryResponseInterceptor)
export class GrantListController {
  @Inject()
  private readonly securityService!: SecurityService;

  @Get()
  async index(
    @Param('orgName') orgName: string,
  ): Promise<QueryResponse<GrantList>> {
    const grantList = await this.securityService.getGrantList(orgName);

    if (!grantList) {
      throw new BadRequestException('We did not generate a grantList.');
    }

    return {
      value: grantList,
    };
  }
}
