import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  @Inject()
  private readonly configService!: ConfigService;

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.configService.get('mongo.uri'),
      autoCreate: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };
  }
}
