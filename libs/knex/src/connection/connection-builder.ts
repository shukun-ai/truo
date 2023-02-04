import { TypeException } from '@shukun/exception';
import { DataSourceConnection } from '@shukun/schema';
import knex, { Knex } from 'knex';

import { DB_DEFAULT_MAX_POOLS } from '../constant';

export class ConnectionBuilder {
  async createClient(
    dataSourceConnection: DataSourceConnection,
  ): Promise<Knex> {
    if (!dataSourceConnection) {
      throw new TypeException('The metadata data source is not defined');
    }

    const client = knex({
      client: this.prepareDatabaseType(dataSourceConnection),
      connection: {
        host: dataSourceConnection.host,
        port: dataSourceConnection.port,
        user: dataSourceConnection.username,
        password: dataSourceConnection.password,
        database: dataSourceConnection.database,
      },
      pool: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        afterCreate: (connection: any, callback: any) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          connection.query('SET timezone = "UTC";', function (error: any) {
            callback(error, connection);
          });
        },
        max: dataSourceConnection.maxPools ?? DB_DEFAULT_MAX_POOLS,
      },
    });

    return client;
  }

  private prepareDatabaseType(dataSourceConnection: DataSourceConnection) {
    switch (dataSourceConnection.type) {
      case 'postgres':
        return 'pg';
      case 'oracleDB':
        return 'oracledb';
      default:
        throw new TypeException(
          'We did not support this data source: {{type}}',
          { type: dataSourceConnection.type },
        );
    }
  }
}
