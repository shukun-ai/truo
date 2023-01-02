import { Injectable } from '@nestjs/common';
import { MetadataSchema } from '@shukun/schema';

import { DatabaseAdaptor } from './adaptor/database-adaptor.interface';
import { MongoAdaptorService } from './mongo/mongo-adaptor.service';
import { PostgresAdaptorService } from './postgres/postgres-adaptor.service';

@Injectable()
export class SourceDataAccessService<Model> {
  constructor(
    private readonly mongoAdaptorService: MongoAdaptorService<Model>,
    private readonly postgresAdaptorService: PostgresAdaptorService<Model>,
  ) {}

  async getAdaptor(
    orgName: string,
    metadata: MetadataSchema,
  ): Promise<DatabaseAdaptor<Model>> {
    // TODO add env to enable other data source for security reason, because if the service is host in a SASS.
    if (metadata.source && metadata.source.startsWith('postgres')) {
      return this.postgresAdaptorService;
    }

    return this.mongoAdaptorService;
  }
}
