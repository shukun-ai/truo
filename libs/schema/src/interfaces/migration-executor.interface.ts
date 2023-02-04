import { DataSourceConnection, MetadataElectron } from '@shukun/schema';

export interface IMigrationExecutor {
  run(
    connection: DataSourceConnection,
    changes: MigrationChanges,
  ): Promise<void>;
}

export type MigrationChanges = {
  difference: MigrationDifference;
  previous: MigrationMetadataMap;
  next: MigrationMetadataMap;
};

export type MigrationDifference = {
  added: MigrationMetadataDifference;
  deleted: MigrationMetadataDifference;
  updated: MigrationMetadataDifference;
};

export type MigrationMetadataDifference = {
  [atomName: string]: MigrationElectronDifference;
};

export type MigrationElectronDifference = {
  [electronName: string]: Partial<MetadataElectron>;
};

export type MigrationMetadataMap = {
  [atomName: string]: MigrationElectronMap;
};

export type MigrationElectronMap = {
  [electronName: string]: MetadataElectron;
};
