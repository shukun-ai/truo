import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import {
  eitherTask,
  parallelTask,
  repeatTask,
  sourceQueryTask,
  transformerTask,
} from '@shukun/connector/task';
import { TaskSchema } from '@shukun/schema';
import { Connection } from 'mongoose';

import { TaskDocument, taskMongoSchema } from './task.schema';

@Injectable()
export class ConnectorTaskService {
  constructor(@InjectConnection() private connection: Connection) {}

  async query(orgName: string): Promise<Record<string, TaskSchema>> {
    const entity = await this.getCollection(orgName).find();

    const records: Record<string, TaskSchema> = entity.reduce(
      (records, next) => {
        return {
          ...records,
          [next.name]: this.serialize(next.definition),
        };
      },
      {},
    );

    return {
      either: eitherTask,
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
    const collection = this.connection.model<TaskDocument>(
      this.buildCollectionName(orgName),
      taskMongoSchema,
    );
    return collection;
  }

  private buildCollectionName(orgName: string) {
    return `orgs_${orgName}_system__tasks`;
  }
}
