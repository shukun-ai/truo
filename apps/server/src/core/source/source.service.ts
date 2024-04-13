import { Injectable } from '@nestjs/common';
import { MetadataReviseSchema } from '@shukun/schema';

import { MongoConnectionService } from '../mongo-connection.service';

import { ISource, sourceSchema } from './source.schema';

// TODO rename SourceService to MetadataService when extract editor from core
/**
 * @deprecated this is a editor feature
 */
@Injectable()
export class SourceService {
  constructor(
    private readonly mongoConnectionService: MongoConnectionService,
  ) {}

  async pull(orgName: string): Promise<Record<string, MetadataReviseSchema>> {
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
    sources: Record<string, MetadataReviseSchema>,
  ): Promise<void> {
    await this.getCollection(orgName).create({
      definition: this.deserialize(sources),
    });
  }

  private serialize(buffer: Buffer): Record<string, MetadataReviseSchema> {
    return JSON.parse(buffer.toString());
  }

  private deserialize(sources: Record<string, MetadataReviseSchema>): Buffer {
    return Buffer.from(JSON.stringify(sources));
  }

  private getCollection(orgName: string) {
    const collection = this.mongoConnectionService
      .getClient()
      .model<ISource>(this.buildCollectionName(orgName), sourceSchema);
    return collection;
  }

  private buildCollectionName(orgName: string) {
    return `orgs_${orgName}_editor__metadatas`;
  }
}
