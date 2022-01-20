import {
  Controller,
  Get,
  Inject,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ViewSchema } from '@shukun/schema';
import { ViewService } from '../../core/view.service';
import { VariableService } from '../../source/variable/variable.service';
import { JsonTemplate } from '../../util/json-template';
import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';

import { ResourceType } from '../api.type';

@Controller(`${ResourceType.View}/:orgName`)
@UseInterceptors(QueryResponseInterceptor)
export class ViewController {
  @Inject()
  private readonly viewService!: ViewService;

  @Inject()
  private readonly variableService!: VariableService;

  @Get('views')
  async index(
    @Param('orgName') orgName: string,
  ): Promise<QueryResponse<ViewSchema[]>> {
    // @todo controlled by roles
    const views = await this.viewService.findAll(orgName);

    const jsonTemplate = await this.createJsonTemplate(orgName);

    const value = views.map((view) => ({
      ...view,
      value: jsonTemplate.compile(view.value),
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
    const variables = await this.variableService.findAll(orgName);

    const jsonTemplate = new JsonTemplate('States', {
      secret: (value: unknown) => {
        if (typeof value === 'string') {
          const variable = variables.find(
            (variable) => variable.name === value,
          );
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
