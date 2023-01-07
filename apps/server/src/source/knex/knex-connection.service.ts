import { Injectable } from '@nestjs/common';
import { DataSourceConnection, MetadataSchema } from '@shukun/schema';
import knex from 'knex';

import { TypeException } from '../../exceptions/type-exception';

@Injectable()
export class KnexConnectionService {
  async getClient(dataSourceConnection: DataSourceConnection | null) {
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
      },
    });

    return client;
  }

  getTableName(
    orgName: string,
    metadata: MetadataSchema,
    dataSourceConnection: DataSourceConnection | null,
  ) {
    if (!dataSourceConnection?.tablePrefix) {
      return metadata.name;
    }

    return `${dataSourceConnection.tablePrefix}${metadata.name}`;
  }

  prepareDatabaseType(dataSourceConnection: DataSourceConnection) {
    switch (dataSourceConnection.type) {
      case 'postgres':
        return 'pg';
      case 'oracleDB':
        return 'oracledb';
    }
  }
}
