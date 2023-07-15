import { BadRequestException, Injectable } from '@nestjs/common';
import { FlowEventCompiledCodes, FlowSchema } from '@shukun/schema';

import { CodebaseService } from './codebase.service';
import { OrgService } from './org.service';

@Injectable()
export class FlowService {
  constructor(
    private readonly orgService: OrgService,
    private readonly codebaseService: CodebaseService,
  ) {}

  async findAll(orgName: string): Promise<FlowSchema[]> {
    const application = await this.codebaseService.findByOrgName(orgName);
    return application.flows ?? [];
  }

  async findOne(orgName: string, flowName: string): Promise<FlowSchema> {
    const flows = await this.findAll(orgName);

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
