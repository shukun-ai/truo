import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { ConnectorSchema, RoleResourceType } from '@shukun/schema';

import { ConnectorService } from '../../core/connector/connector.service';
import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';

import { ConnectorCreateDto, ConnectorRemoveDto } from './dto/connector.dto';

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

  @Post('upsert-connector')
  async create(
    @Param('orgName') orgName: string,
    @Body() dto: ConnectorCreateDto,
  ): Promise<QueryResponse<null>> {
    await this.connectorService.upsert(
      orgName,
      dto.connectorName,
      dto.connector,
    );
    return {
      value: null,
    };
  }

  @Post('remove-connector')
  async remove(
    @Param('orgName') orgName: string,
    @Body() dto: ConnectorRemoveDto,
  ): Promise<QueryResponse<null>> {
    await this.connectorService.remove(orgName, dto.connectorName);
    return {
      value: null,
    };
  }
}
