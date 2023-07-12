import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { ConnectorSchema, RoleResourceType } from '@shukun/schema';

import { ConnectorService } from '../../core/connector/connector.service';
import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';

import { ConnectorPushDto } from './dto/connector.dto';

@Controller(`/${RoleResourceType.Developer}/:orgName`)
@UseInterceptors(QueryResponseInterceptor)
export class DeveloperConnectorController {
  constructor(private readonly connectorService: ConnectorService) {}

  @Post('pull-connectors')
  async pull(
    @Param('orgName') orgName: string,
  ): Promise<QueryResponse<Record<string, ConnectorSchema>>> {
    const connectors = await this.connectorService.pull(orgName);
    return {
      value: connectors,
    };
  }

  @Post('push-connectors')
  async push(
    @Param('orgName') orgName: string,
    @Body() dto: ConnectorPushDto,
  ): Promise<QueryResponse<null>> {
    await this.connectorService.push(orgName, dto.definition);
    return {
      value: null,
    };
  }
}
