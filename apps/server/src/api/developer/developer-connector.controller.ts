import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { ConnectorSchema, RoleResourceType } from '@shukun/schema';

import { ConnectorService } from '../../core/connector.service';
import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';

import { DeveloperConnectorCreateDto } from './developer-connector-create.dto';

@Controller(`/${RoleResourceType.Developer}/:orgName`)
@UseInterceptors(QueryResponseInterceptor)
export class DeveloperConnectorController {
  constructor(private readonly connectorService: ConnectorService) {}

  @Post('get-connector/:connectorName')
  async get(
    @Param('orgName') orgName: string,
    @Param('connectorName') connectorName: string,
  ): Promise<QueryResponse<ConnectorSchema>> {
    const connector = await this.connectorService.get(orgName, connectorName);
    return {
      value: connector,
    };
  }

  @Post('create-connector')
  async create(
    @Param('orgName') orgName: string,
    @Body() dto: DeveloperConnectorCreateDto,
  ): Promise<QueryResponse<null>> {
    await this.connectorService.create(
      orgName,
      dto.connectorName,
      dto.connector,
    );
    return {
      value: null,
    };
  }

  @Post('update-connector')
  async update(
    @Param('orgName') orgName: string,
    @Body() dto: DeveloperConnectorCreateDto,
  ): Promise<QueryResponse<null>> {
    await this.connectorService.update(
      orgName,
      dto.connectorName,
      dto.connector,
    );
    return {
      value: null,
    };
  }
}
