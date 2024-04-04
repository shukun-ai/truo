import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { TypeException } from '@shukun/exception';
import Mongoose, { connect } from 'mongoose';

import { OrgModel } from './org/org.schema';

@Injectable()
export class MongoConnectionService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  orgModel = OrgModel;

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
}
