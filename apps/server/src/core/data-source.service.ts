import { Injectable } from '@nestjs/common';
import { TypeException } from '@shukun/exception';
import {
  DataSourceConnection,
  DataSourceEnvironment,
  DataSourceSchema,
} from '@shukun/schema';

import { OrgService } from './org.service';

@Injectable()
export class DataSourceService {
  constructor(private readonly orgService: OrgService) {}

  async findDataSource(orgName: string): Promise<DataSourceSchema> {
    const dataSource = await this.orgService.findDataSource(orgName);
    return dataSource;
  }

  async findDataSourceConnection(
    orgName: string,
    atomName: string,
  ): Promise<DataSourceConnection> {
    const dataSource = await this.findDataSource(orgName);
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

  async findDataSourceEnvironment(
    orgName: string,
    environmentName: string,
  ): Promise<DataSourceEnvironment> {
    const dataSource = await this.findDataSource(orgName);

    const environment = dataSource.environments?.[environmentName];

    if (!environment) {
      throw new TypeException(
        'Did not find data source environment: {{environmentName}}',
        { environmentName },
      );
    }

    return environment;
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
