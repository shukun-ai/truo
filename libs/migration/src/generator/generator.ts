import { MetadataElectron } from '@shukun/schema';

import { Differ } from '../differ/differ';
import {
  DiffMetadataSchema,
  DiffMetadataElectron,
} from '../differ/differ.type';
import { ElectronBuilderFactory } from '../electrons/electron-builder.factory';

export class Generator {
  constructor(private readonly differ: Differ) {}

  public generate(): string {
    const diffResult = this.differ.getDetail();
    const clauses: string[] = [];

    clauses.push(this.prepareAdded(diffResult.added));
    clauses.push(this.prepareUpdated(diffResult.updated));
    clauses.push(this.prepareDeleted(diffResult.deleted));

    return clauses.join('');
  }

  prepareAdded(atoms: DiffMetadataSchema): string {
    const clauses: string[] = [];
    for (const [atomName, electrons] of Object.entries(atoms)) {
      clauses.push(`
        schema.createTable(helpers.getTableName('${atomName}'), (table) => {
            ${this.prepareColumns(
              atomName,
              electrons,
              this.prepareAddedColumn.bind(this),
            )}
        });
        `);
    }
    return clauses.join('\n');
  }

  prepareUpdated(atoms: DiffMetadataSchema): string {
    const clauses: string[] = [];
    for (const [atomName, electrons] of Object.entries(atoms)) {
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
    return clauses.join('\n');
  }

  prepareDeleted(atoms: DiffMetadataSchema): string {
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
    electrons: DiffMetadataElectron,
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
    const electron = this.differ.seekRightElectron(atomName, electronName);
    const electronBuilder = ElectronBuilderFactory.create(electron);
    const code = electronBuilder.buildSqlSchema();
    return `table${code};`;
  }
}
