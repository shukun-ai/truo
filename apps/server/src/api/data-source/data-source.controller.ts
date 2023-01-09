import {
  Controller,
  Param,
  Post,
  UseInterceptors,
  BadRequestException,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  RoleResourceType,
  DataSourceSchema,
  validateDataSourceSchema,
} from '@shukun/schema';

import { OrgService } from '../../core/org.service';
import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';

@Controller(`/${RoleResourceType.Developer}/:orgName/data-source`)
@UseInterceptors(QueryResponseInterceptor)
@ApiBearerAuth()
export class DataSourceController {
  constructor(private readonly orgService: OrgService) {}

  @Post()
  async import(
    @Param('orgName') orgName: string,
    // The body did not show in Swagger, because we did not add Swagger Decorator.
    @Body() dataSource: DataSourceSchema,
  ): Promise<QueryResponse<null>> {
    const result = validateDataSourceSchema(dataSource);

    if (!result) {
      const errorMessage = JSON.stringify(validateDataSourceSchema.errors);
      throw new BadRequestException(
        `The file is not validated by application JSON Schema: ${errorMessage}`,
      );
    }

    // @remark to avoid MongoDB throw error.
    delete dataSource.$schema;

    this.orgService.updateDataSource(orgName, dataSource);

    return {
      value: null,
    };
  }
}
