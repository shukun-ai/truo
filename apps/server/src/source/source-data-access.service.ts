import { Injectable } from '@nestjs/common';
import { DataSourceConnection } from '@shukun/schema';

import { DatabaseAdaptor } from './adaptor/database-adaptor.interface';
import { KnexAdaptorService } from './knex/knex-adaptor.service';
import { MongoAdaptorService } from './mongo/mongo-adaptor.service';

@Injectable()
export class SourceDataAccessService<Model> {
  constructor(
    private readonly mongoAdaptorService: MongoAdaptorService<Model>,
    private readonly postgresAdaptorService: KnexAdaptorService<Model>,
  ) {}

  async getAdaptor(
    dataSourceConnection: DataSourceConnection | null,
  ): Promise<DatabaseAdaptor<Model>> {
    // TODO add env to enable other data source for security reason, because if the service is host in a SASS.
    if (
      dataSourceConnection &&
      dataSourceConnection.connection.startsWith('postgres')
    ) {
      return this.postgresAdaptorService;
    }

    return this.mongoAdaptorService;
  }
}
