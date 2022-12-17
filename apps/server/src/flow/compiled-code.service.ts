import { Injectable } from '@nestjs/common';

import { FlowService } from '../core/flow.service';

@Injectable()
export class CompiledCodeService {
  constructor(private readonly flowService: FlowService) {}

  async getEventCompiledCodes(orgName: string, flowName: string) {
    const codes = await this.flowService.findEventCompiledCodes(
      orgName,
      flowName,
    );
    return codes;
  }
}
