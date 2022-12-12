import { Injectable } from '@nestjs/common';
import { FlowSchema } from '@shukun/schema';

@Injectable()
export class DefinitionService {
  async getDefinition(orgName: string, flowName: string) {
    // TODO implement this method.
    const definition: FlowSchema = {
      name: 'test',
      startEventName: 'first',
      input: {},
      output: {},
      events: {
        first: {
          type: 'Success',
          output: {
            id: '{ $input.id }',
          },
        },
      },
    };

    return definition;
  }
}
