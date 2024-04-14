import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { TypeException } from '@shukun/exception';
import { Connection, createConnection } from 'mongoose';

import { IOrg, OrgDocumentName, orgSchema } from './org/org.schema';
import {
  IPresenter,
  PresenterDocumentName,
  presenterSchema,
} from './presenter/presenter.schema';

@Injectable()
export class MongoConnectionService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private connection?: Connection;

  constructor(private readonly configService: ConfigService) {}

  async onApplicationBootstrap() {
    const uri = this.configService.get('mongo.uri');
    if (!uri) {
      throw new TypeException('Did not configure core db uri');
    }
    this.connection = await createConnection(uri, {
      autoCreate: true,
    }).asPromise();
  }

  async onApplicationShutdown() {
    this.connection?.destroy();
  }

  getConnection() {
    if (!this.connection) {
      throw new TypeException('Did not connect to core db');
    }
    return this.connection;
  }

  getOrgModel() {
    return this.getConnection().model<IOrg>(OrgDocumentName, orgSchema);
  }

  getPresenterModel() {
    return this.getConnection().model<IPresenter>(
      PresenterDocumentName,
      presenterSchema,
    );
  }
}
