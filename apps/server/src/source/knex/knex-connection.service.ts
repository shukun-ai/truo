import { Injectable } from '@nestjs/common';
import { TypeException } from '@shukun/exception';
import { buildTableName } from '@shukun/knex';
import { DataSourceConnection, MetadataSchema } from '@shukun/schema';
import knex, { Knex } from 'knex';

import { DB_DEFAULT_MAX_POOLS } from '../../app.constant';

@Injectable()
export class KnexConnectionService {
  knexClients = new Map<string, Knex>();

  async getClient(dataSourceConnection: DataSourceConnection): Promise<Knex> {
    const clientIdentifier = this.prepareClientIdentifier(dataSourceConnection);
    const client = this.knexClients.get(clientIdentifier);

    if (client) {
      return client;
    }

    const newClient = await this.createClient(dataSourceConnection);
    this.knexClients.set(clientIdentifier, newClient);
    return newClient;
  }

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

  getTableName(
    orgName: string,
    metadata: MetadataSchema,
    dataSourceConnection: DataSourceConnection,
  ) {
    // TODO refactor, move the whole service into @shukun/knex.
    return buildTableName(orgName, metadata.name, dataSourceConnection);
  }

  prepareDatabaseType(dataSourceConnection: DataSourceConnection) {
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

  prepareClientIdentifier(dataSourceConnection: DataSourceConnection) {
    const { type, host, port, username, password, database } =
      dataSourceConnection;

    // The formula: type://[username[:password]@][host][:port][/database]
    const typeString = `${type}://`;
    const hostString = host;
    const passwordString = password ? `:${password}` : '';
    const authString = username ? `${username}${passwordString}@` : '';
    const portString = port ? `:${port}` : '';
    const databaseString = database ? `/${database}` : '';

    return `${typeString}${authString}${hostString}${portString}${databaseString}`;
  }
}
