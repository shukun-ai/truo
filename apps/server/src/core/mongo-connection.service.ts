import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { TypeException } from '@shukun/exception';
import Mongoose, { connect } from 'mongoose';

import { OrgModel } from './org/org.schema';
import { PresenterModel } from './presenter/presenter.schema';

@Injectable()
export class MongoConnectionService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  orgModel = OrgModel;

  presenterModel = PresenterModel;

  private client?: typeof Mongoose;

  constructor(private readonly configService: ConfigService) {}

  async onApplicationBootstrap() {
    const uri = this.configService.get('mongo.uri');
    if (!uri) {
      throw new TypeException('Did not configure core db uri');
    }
    this.client = await connect(uri);
  }

  async onApplicationShutdown() {
    this.client?.disconnect();
  }

  getClient() {
    if (!this.client) {
      throw new TypeException('Did not connect to core db');
    }
    return this.client;
  }
}
