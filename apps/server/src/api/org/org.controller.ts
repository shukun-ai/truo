import {
  Controller,
  Get,
  UseInterceptors,
  Inject,
  Param,
} from '@nestjs/common';
import { OrgService } from '../../core/org.service';
import { OrgDocument } from '../../core/org/org.schema';

import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';
import { ResourceType } from '../api.type';

@Controller(`${ResourceType.Public}/:orgName/org`)
@UseInterceptors(QueryResponseInterceptor)
export class OrgController {
  @Inject()
  private readonly orgService: OrgService;

  @Get()
  async index(
    @Param('orgName') orgName: string,
  ): Promise<
    QueryResponse<
      Pick<
        OrgDocument,
        'name' | 'label' | 'lightLogo' | 'darkLogo' | 'mainColor'
      >
    >
  > {
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
}
