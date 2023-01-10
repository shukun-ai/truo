import { DataSourceConnection } from '@shukun/schema';

import { KnexConnectionService } from './knex-connection.service';

describe('KnexConnectionService', () => {
  describe('prepareClientIdentifier', () => {
    it('Only type and host', () => {
      const connection: DataSourceConnection = {
        type: 'postgres',
        host: 'localhost',
        database: 'mock',
        metadata: [],
      };

      const knexConnectionService = new KnexConnectionService();
      const output = knexConnectionService.prepareClientIdentifier(connection);
      expect(output).toEqual('postgres://localhost/mock');
    });

    it('Has port', () => {
      const connection: DataSourceConnection = {
        type: 'postgres',
        host: 'localhost',
        database: 'mock',
        port: 2000,
        metadata: [],
      };

      const knexConnectionService = new KnexConnectionService();
      const output = knexConnectionService.prepareClientIdentifier(connection);
      expect(output).toEqual('postgres://localhost:2000/mock');
    });

    it('Has username', () => {
      const connection: DataSourceConnection = {
        type: 'postgres',
        host: 'localhost',
        database: 'mock',
        username: 'mock',
        metadata: [],
      };

      const knexConnectionService = new KnexConnectionService();
      const output = knexConnectionService.prepareClientIdentifier(connection);
      expect(output).toEqual('postgres://mock@localhost/mock');
    });

    it('Has username and password', () => {
      const connection: DataSourceConnection = {
        type: 'postgres',
        host: 'localhost',
        database: 'mock',
        username: 'mock',
        password: 'mock',
        metadata: [],
      };

      const knexConnectionService = new KnexConnectionService();
      const output = knexConnectionService.prepareClientIdentifier(connection);
      expect(output).toEqual('postgres://mock:mock@localhost/mock');
    });
  });
});
