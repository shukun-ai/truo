import { Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { PresenterSchema, RoleResourceType } from '@shukun/schema';

import { PresenterService } from '../../core/presenter.service';

import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';

@Controller(`${RoleResourceType.Public}/:orgName`)
@UseInterceptors(QueryResponseInterceptor)
export class PresenterController {
  constructor(private readonly presenterService: PresenterService) {}

  @Post('presenters/:presenterName')
  async show(
    @Param('orgName') orgName: string,
    @Param('presenterName') presenterName: string,
  ): Promise<QueryResponse<PresenterSchema>> {
    const presenter = await this.presenterService.findOne(
      orgName,
      presenterName,
    );

    return {
      value: presenter,
    };
  }
}
