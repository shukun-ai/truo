import { Injectable } from '@nestjs/common';
import { DataSourceConnection, DataSourceSchema } from '@shukun/schema';

import { OrgService } from './org.service';

@Injectable()
export class DataSourceService {
  constructor(private readonly orgService: OrgService) {}

  async findAll(orgName: string): Promise<DataSourceSchema> {
    const dataSource = await this.orgService.findDataSource(orgName);
    return dataSource;
  }

  async findConnection(
    orgName: string,
    atomName: string,
  ): Promise<DataSourceConnection> {
    const dataSource = await this.findAll(orgName);
    let dataSourceConnection = this.prepareDefaultConnection();

    if (!dataSource.connections) {
      return dataSourceConnection;
    }

    for (const connection of Object.values(dataSource.connections)) {
      if (connection.metadata.includes(atomName)) {
        dataSourceConnection = connection;
      }
    }

    return dataSourceConnection;
  }

  protected prepareDefaultConnection(): DataSourceConnection {
    // TODO when refactor the mongoose, please use real database connection information.
    return {
      type: 'default',
      host: 'localhost',
      database: 'database',
      metadata: [],
    };
  }
}
