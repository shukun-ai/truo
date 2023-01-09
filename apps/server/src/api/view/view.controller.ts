import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { RoleResourceType, ViewSchema } from '@shukun/schema';

import { DataSourceService } from '../../core/data-source.service';

import { ViewService } from '../../core/view.service';
import { JsonTemplate } from '../../util/json-template';
import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';

@Controller(`${RoleResourceType.View}/:orgName`)
@UseInterceptors(QueryResponseInterceptor)
export class ViewController {
  constructor(
    private readonly viewService: ViewService,
    private readonly dataSourceService: DataSourceService,
  ) {}

  @Get('views')
  async index(
    @Param('orgName') orgName: string,
  ): Promise<QueryResponse<ViewSchema[]>> {
    // TODO controlled by roles
    const views = await this.viewService.findAll(orgName);

    const jsonTemplate = await this.createJsonTemplate(orgName);

    const value = views.map((view) => ({
      ...jsonTemplate.compile(view),
    }));

    return {
      value,
    };
  }

  @Get('views/:viewName')
  async show(
    @Param('orgName') orgName: string,
    @Param('viewName') viewName: string,
  ): Promise<QueryResponse<ViewSchema>> {
    const view = await this.viewService.findOne(orgName, viewName);

    const jsonTemplate = await this.createJsonTemplate(orgName);

    return {
      value: {
        ...view,
        value: jsonTemplate.compile(view.value),
      },
    };
  }

  async createJsonTemplate(orgName: string) {
    const dataSource = await this.dataSourceService.findDataSource(orgName);

    const jsonTemplate = new JsonTemplate('States', {
      secret: (value: unknown) => {
        if (typeof value === 'string') {
          const variable = dataSource.environments?.[value];
          if (variable) {
            return variable.value;
          }
        }
        return value;
      },
    });

    return jsonTemplate;
  }
}
