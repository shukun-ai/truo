import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { MetadataSchema } from '@shukun/schema';
import { Connection } from 'mongoose';

import { SourceDocument, sourceMongoSchema } from './source.schema';

// TODO rename SourceService to MetadataService when extract editor from core
@Injectable()
export class SourceService {
  constructor(@InjectConnection() private connection: Connection) {}

  async pull(orgName: string): Promise<Record<string, MetadataSchema>> {
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
    sources: Record<string, MetadataSchema>,
  ): Promise<void> {
    await this.getCollection(orgName).create({
      definition: this.deserialize(sources),
    });
  }

  private serialize(buffer: Buffer): Record<string, MetadataSchema> {
    return JSON.parse(buffer.toString());
  }

  private deserialize(sources: Record<string, MetadataSchema>): Buffer {
    return Buffer.from(JSON.stringify(sources));
  }

  private getCollection(orgName: string) {
    const collection = this.connection.model<SourceDocument>(
      this.buildCollectionName(orgName),
      sourceMongoSchema,
    );
    return collection;
  }

  private buildCollectionName(orgName: string) {
    return `orgs_${orgName}_editor__sources`;
  }
}
