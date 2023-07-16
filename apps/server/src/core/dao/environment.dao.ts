import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { TypeException } from '@shukun/exception';
import { EnvironmentSchema } from '@shukun/schema';
import { Connection } from 'mongoose';

import {
  EnvironmentDocument,
  environmentMongoSchema,
} from './environment.schema';

@Injectable()
export class EnvironmentDao {
  constructor(@InjectConnection() private connection: Connection) {}

  async get(
    orgName: string,
    environmentName: string,
  ): Promise<EnvironmentSchema> {
    const environments = await this.getAll(orgName);
    const environment = environments[environmentName];
    if (!environment) {
      throw new TypeException('Did not find environment by name: {{name}}', {
        name: environmentName,
      });
    }
    return environment;
  }

  async getAll(orgName: string): Promise<Record<string, EnvironmentSchema>> {
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

  async saveAll(
    orgName: string,
    environments: Record<string, EnvironmentSchema>,
  ): Promise<void> {
    await this.getCollection(orgName).create({
      definition: this.deserialize(environments),
    });
  }

  private serialize(buffer: Buffer): Record<string, EnvironmentSchema> {
    return JSON.parse(buffer.toString());
  }

  private deserialize(environments: Record<string, EnvironmentSchema>): Buffer {
    return Buffer.from(JSON.stringify(environments));
  }

  private getCollection(orgName: string) {
    const collection = this.connection.model<EnvironmentDocument>(
      this.buildCollectionName(orgName),
      environmentMongoSchema,
    );
    return collection;
  }

  private buildCollectionName(orgName: string) {
    return `orgs_${orgName}_editor__environments`;
  }
}
