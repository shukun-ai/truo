import { MetadataElectron } from '../types/application';
import { DataSourceConnection } from '../types/data-source';

export interface IMigrationExecutor {
  run(
    changes: MigrationChanges,
    context: MigrationExecutorContext,
  ): Promise<void>;
}

export type MigrationExecutorContext = {
  orgName: string;
  connection: DataSourceConnection;
};

export type MigrationChanges = {
  difference: MigrationDifference;
  previous: MigrationMetadataMap;
  next: MigrationMetadataMap;
};

export type MigrationDifference = {
  added: MigrationMetadataMap;
  deleted: MigrationMetadataMap;
  updated: MigrationMetadataMap;
};

export type MigrationMetadataMap = {
  [atomName: string]: MigrationElectronMap;
};

export type MigrationElectronMap = {
  [electronName: string]: MetadataElectron;
};
