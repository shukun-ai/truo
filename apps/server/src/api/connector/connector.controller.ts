import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { ConnectorHandlerService } from '@shukun/connector/node-runtime';
import { RoleResourceType } from '@shukun/schema';

import { ConnectorService } from '../../core/connector/connector.service';
import { ConnectorTaskService } from '../../core/connector/task.service';
import { EnvironmentService } from '../../core/environment.service';
import { SecurityRequest } from '../../identity/utils/security-request';
import { apiPrefix } from '../prefix';

@Controller(`${apiPrefix}/${RoleResourceType.Connector}/:orgName`)
export class ConnectorController {
  constructor(
    private readonly connectorHandlerService: ConnectorHandlerService,
    private readonly environmentService: EnvironmentService,
    private readonly connectorService: ConnectorService,
    private readonly connectorTaskService: ConnectorTaskService,
  ) {}

  @Post(':connectorName')
  async run(
    @Req() req: SecurityRequest,
    @Param('orgName') orgName: string,
    @Param('connectorName') connectorName: string,
    @Body() dto: Record<string, unknown>,
  ): Promise<unknown> {
    const connector = await this.connectorService.get(orgName, connectorName);
    const taskDefinitions = await this.connectorTaskService.query(orgName);
    const env = await this.environmentService.findAllEnvironments(orgName);

    const output = await this.connectorHandlerService.execute(
      {
        input: dto,
        next: connector.start,
        index: 0,
        env,
        temps: {},
        params: dto,
        orgName,
        operatorId: req.userId,
        accessToken: req.accessToken,
      },
      connector,
      taskDefinitions,
    );

    return output.input;
  }
}
