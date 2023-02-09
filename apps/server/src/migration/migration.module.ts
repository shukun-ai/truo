import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';

import {
  oracleMigrationExecutorProvider,
  postgresMigrationExecutorProvider,
} from './migration.provider';

import { MigrationService } from './migration.service';

@Module({
  imports: [CoreModule],
  providers: [
    MigrationService,
    postgresMigrationExecutorProvider,
    oracleMigrationExecutorProvider,
  ],
  exports: [MigrationService],
})
export class MigrationModule {}
