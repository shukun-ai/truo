import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule } from 'nest-router';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import winston from 'winston';

import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { IdentityModule } from './identity/identity.module';
import { routes } from './routes';
import { ScheduleModule } from './schedule/schedule.module';
import { SourceModule } from './source/source.module';
import { configuration } from './util/config/configuration';
import { MongooseConfigService } from './util/database/mongo/mongoose-config.service';
import { PassportModule } from './util/passport/passport.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
      ],
    }),
    RouterModule.forRoutes(routes),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    CoreModule,
    WebhookModule,
    ApiModule,
    SourceModule,
    IdentityModule,
    PassportModule,
    ScheduleModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
