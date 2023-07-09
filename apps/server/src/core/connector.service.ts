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
import { ConnectorSchema, TaskSchema } from '@shukun/schema';
import { Connection } from 'mongoose';

import { connectorMongoSchema } from './connector/connector.schema';

@Injectable()
export class ConnectorService {
  constructor(@InjectConnection() private connection: Connection) {}

  async get(orgName: string, connectorName: string): Promise<ConnectorSchema> {
    const entity = await this.getCollection(orgName).findOne({
      name: connectorName,
    });

    if (!entity || !entity.content) {
      throw new TypeException('Did not find connector by name: {{name}}', {
        name: connectorName,
      });
    }

    return this.serialize(entity.content);
  }

  async create(
    orgName: string,
    connectorName: string,
    connector: ConnectorSchema,
  ): Promise<void> {
    await this.getCollection(orgName).create({
      unique: `${orgName}:${connectorName}`,
      name: connectorName,
      content: this.deserialize(connector),
    });
  }

  async update(
    orgName: string,
    connectorName: string,
    connector: ConnectorSchema,
  ): Promise<void> {
    await this.getCollection(orgName).findOneAndUpdate(
      {
        name: connectorName,
      },
      {
        content: this.deserialize(connector),
      },
    );
  }

  private serialize(buffer: Buffer): ConnectorSchema {
    return JSON.parse(buffer.toString());
  }

  private deserialize(connector: ConnectorSchema): Buffer {
    return Buffer.from(JSON.stringify(connector));
  }

  private getCollection(orgName: string) {
    const collection = this.connection.model(
      this.buildCollectionName(orgName),
      connectorMongoSchema,
    );
    return collection;
  }

  private buildCollectionName(orgName: string) {
    return `orgs_${orgName}_system__connectors`;
  }

  async getDefinitions(orgName: string): Promise<Record<string, TaskSchema>> {
    return {
      choice: choiceTask,
      parallel: parallelTask,
      repeat: repeatTask,
      transformer: transformerTask,
      sourceQuery: sourceQueryTask,
    };
  }
}
