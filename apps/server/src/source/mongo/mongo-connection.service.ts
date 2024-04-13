import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeException } from '@shukun/exception';
import Mongoose, { connect } from 'mongoose';

@Injectable()
export class MongoConnectionService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private client?: typeof Mongoose;

  constructor(private readonly configService: ConfigService) {}

  async onApplicationBootstrap() {
    const uri = this.configService.get('mongo.uri');
    if (!uri) {
      throw new TypeException('Did not configure source db uri');
    }
    this.client = await connect(uri, {
      autoCreate: true,
    });
  }

  async onApplicationShutdown() {
    this.client?.disconnect();
  }

  getClient() {
    if (!this.client) {
      throw new TypeException('Did not connect to source db');
    }
    return this.client;
  }

  getConnection() {
    return this.getClient().connection;
  }
}
