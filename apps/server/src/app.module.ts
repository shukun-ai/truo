import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { IdentityModule } from './identity/identity.module';
import { ScheduleModule } from './schedule/schedule.module';
import { SourceModule } from './source/source.module';
import { configuration } from './util/config/configuration';
import { PassportModule } from './util/passport/passport.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
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
