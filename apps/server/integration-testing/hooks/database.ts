import { MigrationManager } from '@shukun/knex';
import { DataSourceConnection } from '@shukun/schema';

export const createDatabase = async (connection: DataSourceConnection) => {
  const migrationManager = new MigrationManager();
  await migrationManager.createDatabase({ connection });
};

export const destroyDatabase = async (connection: DataSourceConnection) => {
  const migrationManager = new MigrationManager();
  await migrationManager.dropDatabase({ connection });
};
