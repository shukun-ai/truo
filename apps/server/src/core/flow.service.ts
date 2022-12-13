import { BadRequestException, Injectable } from '@nestjs/common';
import { FlowEventCompiledCodes, FlowSchema } from '@shukun/schema';

import { OrgService } from './org.service';

@Injectable()
export class FlowService {
  constructor(private readonly orgService: OrgService) {}

  async findAll(orgName: string): Promise<FlowSchema[]> {
    const application = await this.orgService.findCodebaseByOrgName(orgName);
    return application.flows ?? [];
  }

  takeOne(flows: FlowSchema[], flowName: string) {
    const flow = flows?.find((item) => item.name === flowName);

    if (!flow) {
      throw new BadRequestException(`Did not find flow: ${flowName}.`);
    }

    return flow;
  }

  async findEventCompiledCodes(
    orgName: string,
    flowName: string,
  ): Promise<FlowEventCompiledCodes> {
    const flowOrgCompiledCodes =
      await this.orgService.findFlowOrgCompiledCodesByOrgName(orgName);

    if (!flowOrgCompiledCodes[flowName]) {
      throw new BadRequestException(
        `Did not find findEventCompiledCode: ${flowName}`,
      );
    }

    return flowOrgCompiledCodes[flowName];
  }
}
