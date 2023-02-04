import { DataSourceSchema, MetadataSchema } from '@shukun/schema';

export interface IRunner {
  migrate(
    previousMetadata: MetadataSchema[],
    nextMetadata: MetadataSchema[],
    connections: NonNullable<DataSourceSchema>,
  ): Promise<void>;
}
