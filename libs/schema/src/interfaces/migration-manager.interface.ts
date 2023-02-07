import { DataSourceConnection } from '../types/data-source';

export interface IMigrationManager {
  createDatabase(context: MigrationManagerContext): Promise<void>;
  dropDatabase(context: MigrationManagerContext): Promise<void>;
}

export type MigrationManagerContext = {
  connection: DataSourceConnection;
};
