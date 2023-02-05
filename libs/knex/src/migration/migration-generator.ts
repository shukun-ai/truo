import { TypeException } from '@shukun/exception';
import {
  DataSourceConnection,
  MetadataElectron,
  MigrationChanges,
  MigrationElectronDifference,
  MigrationMetadataDifference,
} from '@shukun/schema';

import { ElectronBuilderFactory } from '../electrons/electron-builder.factory';

export class MigrationGenerator {
  constructor(
    private readonly changes: MigrationChanges,
    private readonly connection: DataSourceConnection,
  ) {}

  public generate(): string {
    const clauses: string[] = [];

    clauses.push(`const createSchemas = (schema, helpers) => {`);
    clauses.push(this.prepareAdded(this.changes.difference.added));
    clauses.push(this.prepareUpdated(this.changes.difference.updated));
    clauses.push(this.prepareDeleted(this.changes.difference.deleted));
    clauses.push(`\nreturn schema;\n`);
    clauses.push(`};`);

    return clauses.join('');
  }

  private prepareAdded(atoms: MigrationMetadataDifference): string {
    const clauses: string[] = [];

    for (const [atomName, electrons] of Object.entries(atoms)) {
      if (this.includesAtom(atomName)) {
        clauses.push(`
        schema.createTable(helpers.getTableName('${atomName}'), (table) => {
            ${this.prepareInternalColumns()}
            ${this.prepareColumns(
              atomName,
              electrons,
              this.prepareAddedColumn.bind(this),
            )}
        });
        `);
      }
    }
    return clauses.join('\n');
  }

  private prepareInternalColumns() {
    const clauses: string[] = [];
    clauses.push(`table.string('_id', 255).unique().notNullable();`);
    clauses.push(`table.primary('_id');`);
    clauses.push(`table.string('owner', 255);`);
    clauses.push(`table.timestamp('createdAt').nullable();`);
    clauses.push(`table.timestamp('updatedAt').nullable();`);
    return clauses.join('\n');
  }

  private prepareUpdated(atoms: MigrationMetadataDifference): string {
    const clauses: string[] = [];
    for (const [atomName, electrons] of Object.entries(atoms)) {
      if (this.includesAtom(atomName)) {
        clauses.push(`
        schema.alterTable(helpers.getTableName('${atomName}'), (table) => {
            ${this.prepareColumns(
              atomName,
              electrons,
              this.prepareUpdatedColumn.bind(this),
            )}
        });
        `);
      }
    }
    return clauses.join('\n');
  }

  prepareDeleted(atoms: MigrationMetadataDifference): string {
    const clauses: string[] = [];
    for (const [atomName] of Object.entries(atoms)) {
      clauses.push(`
        schema.dropTableIfExists(helpers.getTableName('${atomName}'));
        `);
    }
    return clauses.join('\n');
  }

  private prepareColumns(
    atomName: string,
    electrons: MigrationElectronDifference,
    callback: (
      atomName: string,
      electronName: string,
      electron: Partial<MetadataElectron>,
    ) => string,
  ) {
    const clauses: string[] = [];
    for (const [electronName, electron] of Object.entries(electrons)) {
      clauses.push(callback(atomName, electronName, electron));
    }
    return clauses.join('\n');
  }

  private prepareAddedColumn(
    atomName: string,
    electronName: string,
    electron: Partial<MetadataElectron>,
  ): string {
    const clauses: string[] = [];

    if (electron.fieldType && electron.name) {
      clauses.push(this.prepareElectron(atomName, electronName));
    }

    if (electron.isRequired === false) {
      clauses.push(`table.setNullable('${electronName}');`);
    }

    if (electron.isUnique === true) {
      clauses.push(`table.unique('${electronName}');`);
    }

    if (electron.isIndexed === true) {
      clauses.push(`table.dropIndex('${electronName}');`);
    }

    return clauses.join('\n');
  }

  private prepareUpdatedColumn(
    atomName: string,
    electronName: string,
    electron: Partial<MetadataElectron>,
  ): string {
    const clauses: string[] = [];

    if (electron.fieldType) {
      throw new Error();
    }

    if (electron.isRequired === false) {
      clauses.push(`table.setNullable('${electronName}');`);
    }

    if (electron.isRequired === true) {
      clauses.push(`table.dropNullable('${electronName}');`);
    }

    if (electron.isUnique === false) {
      clauses.push(`table.dropUnique('${electronName}');`);
    }

    if (electron.isUnique === true) {
      clauses.push(`table.unique('${electronName}');`);
    }

    if (electron.isIndexed === false) {
      clauses.push(`table.index('${electronName}');`);
    }

    if (electron.isIndexed === true) {
      clauses.push(`table.dropIndex('${electronName}');`);
    }

    return clauses.join('\n');
  }

  private prepareElectron(atomName: string, electronName: string): string {
    const electron = this.changes.next?.[atomName]?.[electronName];

    if (!electron) {
      throw new TypeException('Did not find electron in migration-generator.');
    }

    const electronBuilder = ElectronBuilderFactory.create(electron);
    const code = electronBuilder.buildSqlSchema();
    return `table${code};`;
  }

  private includesAtom(atomName: string) {
    return this.connection.metadata.includes(atomName);
  }
}
