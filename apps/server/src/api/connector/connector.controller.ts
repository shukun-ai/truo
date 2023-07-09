import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { ConnectorHandlerService } from '@shukun/connector/handler';
import { RoleResourceType } from '@shukun/schema';

import { ConnectorService } from '../../core/connector.service';
import { EnvironmentService } from '../../core/environment.service';
import { SecurityRequest } from '../../identity/utils/security-request';

@Controller(`/${RoleResourceType.Connector}/:orgName`)
export class ConnectorController {
  constructor(
    private readonly connectorHandlerService: ConnectorHandlerService,
    private readonly environmentService: EnvironmentService,
    private readonly connectorService: ConnectorService,
  ) {}

  @Post(':connectorName')
  async call(
    @Req() req: SecurityRequest,
    @Param('orgName') orgName: string,
    @Param('connectorName') connectorName: string,
    @Body() dto: unknown,
  ): Promise<unknown> {
    const connector = await this.connectorService.get(orgName, connectorName);
    const taskDefinitions = await this.connectorService.getDefinitions(orgName);
    const env = await this.environmentService.findAllEnvironments(orgName);

    const output = await this.connectorHandlerService.execute({
      input: dto,
      next: connector.start,
      index: 0,
      env,
      store: {},
      orgName,
      operatorId: req.userId,
      accessToken: req.accessToken,
      taskDefinitions,
      connector,
    });

    return output.input;
  }
}
