import { Injectable } from '@nestjs/common';
import { FlowSchema } from '@shukun/schema';

import { FlowService } from '../core/flow.service';

@Injectable()
export class DefinitionService {
  constructor(private readonly flowService: FlowService) {}

  async getDefinition(orgName: string, flowName: string): Promise<FlowSchema> {
    const flow = await this.flowService.findOne(orgName, flowName);
    return flow;
  }
}
