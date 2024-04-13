import {
  Controller,
  Get,
  UseInterceptors,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GatewayForbiddenException } from '@shukun/exception';
import { RoleResourceType, SystemPublicOrgModel } from '@shukun/schema';

import { OrgService } from '../../../core/org.service';

import { TenantService } from '../../../tenant/tenant.service';
import { QueryResponseInterceptor } from '../../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../../util/query/interfaces';

import { apiPrefix } from '../../prefix';

import { OrgCreateDto } from './dto';

@Controller(`${apiPrefix}/${RoleResourceType.Public}/:orgName/org`)
@UseInterceptors(QueryResponseInterceptor)
export class OrgController {
  constructor(
    private readonly orgService: OrgService,
    private readonly tenantService: TenantService,
    private readonly configService: ConfigService,
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

  /**
   * @deprecated
   * This is editor feature, we should deprecate
   */
  @Post('create')
  async createNewOrg(
    @Body() createDto: OrgCreateDto,
  ): Promise<QueryResponse<null>> {
    const orgRegisterMode = this.configService.get('org.registerMode');

    if (orgRegisterMode !== 'self-create') {
      throw new GatewayForbiddenException(
        'The runtime does not enable self-create org',
      );
    }

    await this.tenantService.createNewOrg(createDto);
    return {
      value: null,
    };
  }
}
