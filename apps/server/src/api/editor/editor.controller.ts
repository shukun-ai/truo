import { Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { PresenterSchema, RoleResourceType } from '@shukun/schema';

import { PresenterService } from '../../core/presenter.service';

import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';

@Controller(`${RoleResourceType.Editor}/:orgName`)
@UseInterceptors(QueryResponseInterceptor)
export class EditorController {
  constructor(private readonly presenterService: PresenterService) {}

  @Post('presenter')
  async getPresenter(
    @Param('orgName') orgName: string,
  ): Promise<QueryResponse<Record<string, PresenterSchema>>> {
    const presenter = await this.presenterService.findAll(orgName);

    return {
      value: presenter,
    };
  }
}
