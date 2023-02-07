import {
  DataSourceConnection,
  MigrationChanges,
  MigrationMetadataMap,
} from '@shukun/schema';

import { MigrationAlterTable } from './migration-alter-table';

import { MigrationCreateTable } from './migration-create-table';

export class MigrationGenerator {
  constructor(
    private readonly changes: MigrationChanges,
    private readonly connection: DataSourceConnection,
  ) {}

  public generate(): string {
    const addedClause = new MigrationCreateTable().build(
      this.filterAtoms(this.changes.difference.added),
    );
    const updatedClause = new MigrationAlterTable().build(
      this.filterAtoms(this.changes.difference.updated),
      this.changes.previous,
    );
    const deletedClause = this.buildDeletedClause(
      this.filterAtoms(this.changes.difference.deleted),
    );

    return `
      const createSchemas = (schema, helpers) => {
        ${addedClause}
        ${updatedClause}
        ${deletedClause}
        return schema;
      };
    `.trim();
  }

  private filterAtoms(atoms: MigrationMetadataMap) {
    const newAtoms: MigrationMetadataMap = {};

    for (const [atomName, electrons] of Object.entries(atoms)) {
      if (this.connection.metadata.includes(atomName)) {
        newAtoms[atomName] = electrons;
      }
    }

    return newAtoms;
  }

  private buildDeletedClause(atoms: MigrationMetadataMap): string {
    const clauses: string[] = [];
    for (const [atomName] of Object.entries(atoms)) {
      clauses.push(
        `
        schema.dropTableIfExists(helpers.getTableName('${atomName}'));
        `.trim(),
      );
    }
    return clauses.join('\n');
  }
}
