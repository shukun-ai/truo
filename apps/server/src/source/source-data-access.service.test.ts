import { BadRequestException } from '@nestjs/common';
import { DataSourceConnection } from '@shukun/schema';

import { KnexAdaptorService } from './knex/knex-adaptor.service';
import { MongoAdaptorService } from './mongo/mongo-adaptor.service';
import { SourceDataAccessService } from './source-data-access.service';

describe('SourceDataAccessService', () => {
  let sourceDataAccessService: SourceDataAccessService<any>;
  let mongoAdaptorService: MongoAdaptorService<any>;
  let knexAdaptorService: KnexAdaptorService<any>;

  beforeEach(() => {
    mongoAdaptorService = new (MongoAdaptorService as any)();
    knexAdaptorService = new (KnexAdaptorService as any)();
    sourceDataAccessService = new SourceDataAccessService<any>(
      mongoAdaptorService,
      knexAdaptorService,
    );
  });

  describe('getAdaptor', () => {
    it('should return the KnexAdaptorService when the dataSourceConnection type is "postgres"', async () => {
      const dataSourceConnection: DataSourceConnection = {
        type: 'postgres',
        host: 'localhost',
        database: 'test',
        metadata: [],
      };

      const result = await sourceDataAccessService.getAdaptor(
        dataSourceConnection,
      );

      expect(result).toBe(knexAdaptorService);
    });

    it('should throw a BadRequestException when the dataSourceConnection type is "oracleDB"', async () => {
      const dataSourceConnection: DataSourceConnection = {
        type: 'oracleDB',
        host: 'localhost',
        database: 'test',
        metadata: [],
      };

      await expect(
        sourceDataAccessService.getAdaptor(dataSourceConnection),
      ).rejects.toThrow(BadRequestException);
    });

    it('should return the MongoAdaptorService for any other dataSourceConnection type', async () => {
      const dataSourceConnection: DataSourceConnection = {
        type: 'mysql' as any,
        host: 'localhost',
        database: 'test',
        metadata: [],
      };

      const result = await sourceDataAccessService.getAdaptor(
        dataSourceConnection,
      );

      expect(result).toBe(mongoAdaptorService);
    });
  });
});
