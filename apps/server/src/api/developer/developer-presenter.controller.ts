import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { IDString, PresenterSchema, RoleResourceType } from '@shukun/schema';

import { PresenterService } from '../../core/presenter.service';

import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';
import { apiPrefix } from '../prefix';

@Controller(`${apiPrefix}/${RoleResourceType.Developer}/:orgName`)
@UseInterceptors(QueryResponseInterceptor)
export class DeveloperPresenterController {
  constructor(private readonly presenterService: PresenterService) {}

  @Post('presenters/any/query')
  async getPresenters(
    @Param('orgName') orgName: string,
  ): Promise<QueryResponse<Record<string, PresenterSchema>>> {
    const presenters = await this.presenterService.findMany(orgName);

    return {
      value: presenters,
    };
  }

  @Post('presenters/any/create')
  async createPresenter(
    @Param('orgName') orgName: string,
    @Body() body: { presenterName: string },
  ): Promise<QueryResponse<{ _id: IDString }>> {
    const presenter = await this.presenterService.createOne({
      orgName,
      name: body.presenterName,
    });

    return {
      value: { _id: presenter._id },
    };
  }

  @Post('presenters/:presenterId/delete')
  async deletePresenter(
    @Param('orgName') orgName: string,
    @Param('presenterName') presenterName: string,
  ): Promise<QueryResponse<null>> {
    await this.presenterService.deleteOne(orgName, presenterName);

    return {
      value: null,
    };
  }

  @Post('presenters/:presenterName/update')
  async updatePresenter(
    @Param('orgName') orgName: string,
    @Param('presenterName') presenterName: string,
    @Body() body: { definition: PresenterSchema },
  ): Promise<QueryResponse<null>> {
    await this.presenterService.updateOne(
      orgName,
      presenterName,
      body.definition,
    );

    return {
      value: null,
    };
  }

  @Post('presenters/:presenterName/query')
  async getPresenter(
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
