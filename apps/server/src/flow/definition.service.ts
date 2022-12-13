import { Injectable } from '@nestjs/common';
import { FlowSchema } from '@shukun/schema';

@Injectable()
export class DefinitionService {
  async getDefinition(orgName: string, flowName: string) {
    // TODO implement this method.
    const definition: FlowSchema = {
      name: 'test',
      startEventName: 'repeat',
      input: {},
      output: {},
      events: {
        repeat: {
          type: 'Repeat',
          next: 'first',
          repeatCount: '$.input.id',
          startEventName: 'second',
          events: {
            second: {
              type: 'Success',
              output: {
                id: '$.index',
              },
            },
          },
          description: 'hi',
        },
        first: {
          type: 'Success',
          output: {
            id: '$.input',
          },
        },
      },
    };

    return definition;
  }
}
