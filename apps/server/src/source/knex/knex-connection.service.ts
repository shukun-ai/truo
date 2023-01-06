import { Injectable } from '@nestjs/common';
import { MetadataSchema } from '@shukun/schema';
import knex from 'knex';

import { OrgService } from '../../core/org.service';
import { TypeException } from '../../exceptions/type-exception';

@Injectable()
export class KnexConnectionService {
  constructor(private readonly orgService: OrgService) {}

  async getClient(orgName: string, metadata: MetadataSchema) {
    if (!metadata.source) {
      throw new TypeException(
        'The metadata source is not defined: {{source}}',
        { source: metadata.source },
      );
    }

    const client = knex({
      client: 'pg',
      connection: metadata.source,
      pool: {
        afterCreate: (connection: any, callback: any) => {
          connection.query('SET timezone = "UTC";', function (error: any) {
            callback(error, connection);
          });
        },
      },
    });

    return client;
  }

  getTableName(orgName: string, metadata: MetadataSchema) {
    return metadata.name;
  }
}
