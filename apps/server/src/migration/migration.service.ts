import { Inject, Injectable } from '@nestjs/common';
import {
  DataSourceConnection,
  MigrationDifference,
  IMigrationExecutor,
  MigrationChanges,
  MetadataSchema,
} from '@shukun/schema';

import { DataSourceService } from '../core/data-source.service';
import { MetadataService } from '../core/metadata.service';

import { MetadataDiffer } from './metadata-differ/metadata-differ';
import { MetadataMapper } from './metadata-mapper/metadata-mapper';

import { IMigrationService } from './migration.interface';
import { Providers } from './migration.provider';

@Injectable()
export class MigrationService implements IMigrationService {
  constructor(
    private readonly metadataService: MetadataService,
    private readonly dataSourceService: DataSourceService,
    @Inject(Providers.PostgresMigrationExecutor)
    private readonly postgresMigrationExecutor: IMigrationExecutor,
    @Inject(Providers.OracleMigrationExecutor)
    private readonly oracleMigrationExecutor: IMigrationExecutor,
  ) {}

  async preview(orgName: string): Promise<MigrationDifference> {
    const previousMetadata = await this.metadataService.findMigrated(orgName);
    const nextMetadata = await this.metadataService.getAll(orgName);
    const changes = await this.prepareChanges(previousMetadata, nextMetadata);
    return changes.difference;
  }

  async execute(orgName: string): Promise<void> {
    const previousMetadata = await this.metadataService.findMigrated(orgName);
    const nextMetadata = await this.metadataService.getAll(orgName);
    const changes = await this.prepareChanges(previousMetadata, nextMetadata);
    const connections = await this.prepareConnections(orgName);

    for (const connection of Object.values(connections)) {
      this.executeMigration(orgName, connection, changes);
    }

    await this.metadataService.updateMigrated(orgName, nextMetadata);
  }

  private async prepareChanges(
    previousMetadata: MetadataSchema[],
    nextMetadata: MetadataSchema[],
  ): Promise<MigrationChanges> {
    const previous = new MetadataMapper().parse(previousMetadata);
    const next = new MetadataMapper().parse(nextMetadata);
    const difference = new MetadataDiffer().getDetail(previous, next);
    return {
      previous,
      next,
      difference,
    };
  }

  private async prepareConnections(
    orgName: string,
  ): Promise<Record<string, DataSourceConnection>> {
    const dataSource = await this.dataSourceService.findAll(orgName);
    return dataSource.connections ?? {};
  }

  private async executeMigration(
    orgName: string,
    connection: DataSourceConnection,
    changes: MigrationChanges,
  ): Promise<void> {
    switch (connection.type) {
      case 'postgres':
        return this.postgresMigrationExecutor.run(changes, {
          orgName,
          connection,
        });
      case 'oracleDB':
        return this.oracleMigrationExecutor.run(changes, {
          orgName,
          connection,
        });
      case 'default':
        throw new TypeError('We do not need to run migration for default DB.');
    }
  }
}
