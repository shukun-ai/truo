import { IMigrationExecutor, MigrationChanges } from '@shukun/schema';
import { DataSourceConnection } from '@shukun/schema';

export class MigrationExecutor implements IMigrationExecutor {
  run(
    connection: DataSourceConnection,
    changes: MigrationChanges,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
