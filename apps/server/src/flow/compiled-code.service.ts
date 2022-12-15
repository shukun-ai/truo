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

    // TODO move those codes into unit testing.
    // const eventCompiledCodes: FlowEventCompiledCodes = {
    //   first: 'async function main($){return{id:$.input}};exports.default=main;',
    //   repeat:
    //     'async function main($){return $.input.count;};exports.default=main;',
    //   'repeat->second':
    //     'async function main($){return{id:$.index}};exports.default=main;',
    // };
    // return eventCompiledCodes;
  }
}
