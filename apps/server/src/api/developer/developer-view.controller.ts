import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { RoleResourceType, ViewSchema } from '@shukun/schema';

import { OrgService } from '../../core/org.service';
import { ViewService } from '../../core/view.service';
import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';

import { apiPrefix } from '../prefix';

import { ViewPushDto } from './dto/view.dto';

@Controller(`${apiPrefix}/${RoleResourceType.Developer}/:orgName`)
@UseInterceptors(QueryResponseInterceptor)
export class DeveloperViewController {
  constructor(
    private readonly viewService: ViewService,
    private readonly orgService: OrgService,
  ) {}

  @Post('pull-views')
  async pull(
    @Param('orgName') orgName: string,
  ): Promise<QueryResponse<Record<string, ViewSchema>>> {
    const codebase = await this.orgService.findCodebaseByOrgName(orgName);
    const views = codebase.views || [];
    const viewsMap: Record<string, ViewSchema> = views.reduce(
      (acceleration, view) => {
        return {
          ...acceleration,
          [view.name]: view,
        };
      },
      {},
    );

    return {
      value: viewsMap,
    };
  }

  @Post('push-views')
  async push(
    @Param('orgName') orgName: string,
    @Body() dto: ViewPushDto,
  ): Promise<QueryResponse<null>> {
    const views: ViewSchema[] = Object.values(dto.definition);
    const codebase = await this.orgService.findCodebaseByOrgName(orgName);
    await this.orgService.updateCodebase(orgName, {
      ...codebase,
      views,
    });
    return {
      value: null,
    };
  }
}
