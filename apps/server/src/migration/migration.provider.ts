import { FactoryProvider } from '@nestjs/common';
import { MigrationExecutor } from '@shukun/knex';

export enum Providers {
  PostgresMigrationExecutor = 'PostgresMigrationExecutor',
  OracleMigrationExecutor = 'OracleMigrationExecutor',
}

export const postgresMigrationExecutorProvider: FactoryProvider = {
  provide: Providers.PostgresMigrationExecutor,
  useFactory: () => {
    return new MigrationExecutor();
  },
};

export const oracleMigrationExecutorProvider: FactoryProvider = {
  provide: Providers.OracleMigrationExecutor,
  useFactory: () => {
    return new MigrationExecutor();
  },
};
