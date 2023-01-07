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

  async findOne(
    orgName: string,
    atomName: string,
  ): Promise<DataSourceConnection | null> {
    const dataSource = await this.findAll(orgName);
    let sourceConnection = null;

    for (const connection of Object.values(dataSource.connections)) {
      if (connection.metadata.includes(atomName)) {
        sourceConnection = connection;
      }
    }

    return sourceConnection;
  }
}
