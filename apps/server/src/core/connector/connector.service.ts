import { Injectable } from '@nestjs/common';
import { TypeException } from '@shukun/exception';
import { ConnectorSchema } from '@shukun/schema';

import { MongoConnectionService } from '../mongo-connection.service';

import { IConnector, connectorSchema } from './connector.schema';

/**
 * @deprecated this is a editor feature
 */
@Injectable()
export class ConnectorService {
  constructor(
    private readonly mongoConnectionService: MongoConnectionService,
  ) {}

  async get(orgName: string, connectorName: string): Promise<ConnectorSchema> {
    const connectors = await this.pull(orgName);
    const connector = connectors[connectorName];
    if (!connector) {
      throw new TypeException('Did not find connector by name: {{name}}', {
        name: connectorName,
      });
    }
    return connector;
  }

  async pull(orgName: string): Promise<Record<string, ConnectorSchema>> {
    const entity = await this.getCollection(orgName).findOne(
      {},
      {},
      { sort: { createdAt: -1 } },
    );

    if (!entity) {
      return {};
    }

    return this.serialize(entity.definition);
  }

  async push(
    orgName: string,
    connectors: Record<string, ConnectorSchema>,
  ): Promise<void> {
    await this.getCollection(orgName).create({
      definition: this.deserialize(connectors),
    });
  }

  private serialize(buffer: Buffer): Record<string, ConnectorSchema> {
    return JSON.parse(buffer.toString());
  }

  private deserialize(connectors: Record<string, ConnectorSchema>): Buffer {
    return Buffer.from(JSON.stringify(connectors));
  }

  private getCollection(orgName: string) {
    const collection = this.mongoConnectionService
      .getConnection()
      .model<IConnector>(this.buildCollectionName(orgName), connectorSchema);
    return collection;
  }

  private buildCollectionName(orgName: string) {
    return `orgs_${orgName}_editor__connectors`;
  }
}
