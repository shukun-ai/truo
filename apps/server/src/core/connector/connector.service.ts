import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { TypeException } from '@shukun/exception';
import { ConnectorSchema } from '@shukun/schema';
import { Connection } from 'mongoose';

import { connectorMongoSchema } from './connector.schema';

@Injectable()
export class ConnectorService {
  constructor(@InjectConnection() private connection: Connection) {}

  async get(orgName: string, connectorName: string): Promise<ConnectorSchema> {
    const entity = await this.getCollection(orgName).findOne({
      name: connectorName,
    });

    if (!entity || !entity.definition) {
      throw new TypeException('Did not find connector by name: {{name}}', {
        name: connectorName,
      });
    }

    return this.serialize(entity.definition);
  }

  async upsert(
    orgName: string,
    connectorName: string,
    connectorDefinition: ConnectorSchema,
  ): Promise<void> {
    await this.getCollection(orgName).findOneAndUpdate(
      {
        name: connectorName,
      },
      {
        name: connectorName,
        definition: this.deserialize(connectorDefinition),
      },
      {
        upsert: true,
      },
    );
  }

  async remove(orgName: string, connectorName: string): Promise<void> {
    await this.getCollection(orgName).findOneAndRemove({
      name: connectorName,
    });
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
}
