import { Injectable } from '@nestjs/common';
import { FlowSchema } from '@shukun/schema';

import { FlowService } from '../core/flow.service';

@Injectable()
export class DefinitionService {
  constructor(private readonly flowService: FlowService) {}

  async getDefinition(orgName: string, flowName: string): Promise<FlowSchema> {
    const flow = await this.flowService.findOne(orgName, flowName);
    return flow;

    // TODO move those codes into unit testing.
    // TODO implement this method.
    // const definition: FlowSchema = {
    //   name: 'test',
    //   startEventName: 'repeat',
    //   input: {},
    //   output: {},
    //   events: {
    //     repeat: {
    //       type: 'Repeat',
    //       next: 'first',
    //       repeatCount: '$.input.id',
    //       startEventName: 'second',
    //       events: {
    //         second: {
    //           type: 'Success',
    //           output: {
    //             id: '$.index',
    //           },
    //         },
    //       },
    //       description: 'hi',
    //     },
    //     first: {
    //       type: 'Success',
    //       output: {
    //         id: '$.input',
    //       },
    //     },
    //   },
    // };
  }
}
