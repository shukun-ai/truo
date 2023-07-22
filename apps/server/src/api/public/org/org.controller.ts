import {
  Controller,
  Get,
  UseInterceptors,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { RoleResourceType, SystemPublicOrgModel } from '@shukun/schema';

import { OrgService } from '../../../core/org.service';

import { TenantService } from '../../../tenant/tenant.service';
import { QueryResponseInterceptor } from '../../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../../util/query/interfaces';

import { OrgCreateDto } from './dto';

@Controller(`${RoleResourceType.Public}/:orgName/org`)
@UseInterceptors(QueryResponseInterceptor)
export class OrgController {
  constructor(
    private readonly orgService: OrgService,
    private readonly tenantService: TenantService,
  ) {}

  @Get()
  async index(
    @Param('orgName') orgName: string,
  ): Promise<QueryResponse<SystemPublicOrgModel>> {
    const value = await this.orgService.findOne({ filter: { name: orgName } });

    return {
      value: {
        name: value.name,
        label: value.label,
        lightLogo: value.lightLogo,
        darkLogo: value.darkLogo,
        mainColor: value.mainColor,
      },
    };
  }

  @Post('create')
  async createNewOrg(
    @Body() createDto: OrgCreateDto,
  ): Promise<QueryResponse<null>> {
    await this.tenantService.createNewOrg(createDto);
    return {
      value: null,
    };
  }
}
