import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import {
  choiceTask,
  parallelTask,
  repeatTask,
  sourceQueryTask,
  transformerTask,
} from '@shukun/connector/task';
import { TypeException } from '@shukun/exception';
import { TaskSchema } from '@shukun/schema';
import { Connection } from 'mongoose';

import { taskMongoSchema } from './task.schema';

@Injectable()
export class ConnectorTaskService {
  constructor(@InjectConnection() private connection: Connection) {}

  async query(orgName: string): Promise<Record<string, TaskSchema>> {
    const entity = await this.getCollection(orgName).find({});
    const records = entity.reduce((record, next) => {
      const { name, definition } = next;
      if (!name || !definition) {
        throw new TypeException('Did not find next');
      }
      return {
        ...record,
        [name]: this.serialize(definition),
      };
    }, {} as Record<string, TaskSchema>);

    return {
      choice: choiceTask,
      parallel: parallelTask,
      repeat: repeatTask,
      transformer: transformerTask,
      sourceQuery: sourceQueryTask,
      ...records,
    };
  }

  async upsert(
    orgName: string,
    taskName: string,
    taskDefinition: TaskSchema,
  ): Promise<void> {
    await this.getCollection(orgName).findOneAndUpdate(
      {
        name: taskName,
      },
      {
        name: taskName,
        definition: this.deserialize(taskDefinition),
      },
      {
        upsert: true,
      },
    );
  }

  async remove(orgName: string, taskName: string): Promise<void> {
    await this.getCollection(orgName).findOneAndRemove({
      name: taskName,
    });
  }

  private serialize(buffer: Buffer): TaskSchema {
    return JSON.parse(buffer.toString());
  }

  private deserialize(taskDefinition: TaskSchema): Buffer {
    return Buffer.from(JSON.stringify(taskDefinition));
  }

  private getCollection(orgName: string) {
    const collection = this.connection.model(
      this.buildCollectionName(orgName),
      taskMongoSchema,
    );
    return collection;
  }

  private buildCollectionName(orgName: string) {
    return `orgs_${orgName}_system__tasks`;
  }
}
