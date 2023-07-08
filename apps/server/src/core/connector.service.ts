import { Injectable } from '@nestjs/common';
import {
  choiceTask,
  parallelTask,
  repeatTask,
  transformerTask,
} from '@shukun/connector/task';
import { ConnectorSchema, PresenterSchema, TaskSchema } from '@shukun/schema';

export type PresenterEntity = {
  name: string;
  orgName: string;
  definition: PresenterSchema;
};

@Injectable()
export class ConnectorService {
  async get(orgName: string, connectorName: string): Promise<ConnectorSchema> {
    const connector: ConnectorSchema = {
      label: 'test',
      start: 'test',
      tasks: {
        test: {
          type: 'transformer',
          parameters: {
            count: '$$_js:return $.input.number + 100;',
          },
        },
      },
    };
    return connector;
  }

  async getDefinitions(orgName: string): Promise<Record<string, TaskSchema>> {
    return {
      choice: choiceTask,
      parallel: parallelTask,
      repeat: repeatTask,
      transformer: transformerTask,
    };
  }
}
