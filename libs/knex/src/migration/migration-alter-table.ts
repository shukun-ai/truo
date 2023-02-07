import {
  MetadataElectron,
  MigrationElectronMap,
  MigrationMetadataMap,
} from '@shukun/schema';
import { detailedDiff } from 'deep-object-diff';

import { ElectronBuilderFactory } from '../electrons/electron-builder.factory';

export class MigrationAlterTable {
  public build(
    atoms: MigrationMetadataMap,
    previous: MigrationMetadataMap,
  ): string {
    return Object.entries(atoms)
      .map(([atomName, electrons]) =>
        `
                schema.alterTable(helpers.getTableName('${atomName}'), (table) => {
                    ${this.buildElectrons(electrons, previous[atomName])}
                });
            `.trim(),
      )
      .join('\n');
  }

  private buildElectrons(
    current: MigrationElectronMap,
    previous: MigrationElectronMap,
  ): string {
    const diff = this.getDiff(current, previous);
    return `
        ${this.buildAddedElectrons(diff.added)}
        ${this.buildUpdatedElectrons(diff.updated)}
        ${this.buildDeletedElectrons(diff.deleted)}
    `.trim();
  }

  private buildAddedElectrons(electrons: ElectronDifference['added']): string {
    return Object.entries(electrons)
      .map(([electronName, electron]) => {
        return `
            ${this.buildAddedElectron(electronName, electron)}
            ${this.buildAddedConstraint(electronName, electron)}
        `.trim();
      })
      .join('\n');
  }

  private buildAddedConstraint(
    electronName: string,
    electron: Partial<MetadataElectron>,
  ): string {
    const clauses: string[] = [];
    if (electron.isRequired === true) {
      clauses.push(`table.dropNullable('${electronName}');`);
    } else if (electron.isRequired === false) {
      clauses.push(`table.setNullable('${electronName}');`);
    }
    if (electron.isUnique === true) {
      clauses.push(`table.unique('${electronName}');`);
    }
    if (electron.isIndexed === true) {
      clauses.push(`table.index('${electronName}');`);
    }
    return clauses.join('\n');
  }

  private buildAddedElectron(
    electronName: string,
    electron: Partial<MetadataElectron>,
  ): string {
    const isCompleteElectron = !!(
      electron.name &&
      electron.fieldType &&
      typeof electron.isRequired === 'boolean' &&
      electron.label
    );
    return isCompleteElectron
      ? `table${this.buildElectron(electron as MetadataElectron)};`
      : '';
  }

  private buildUpdatedElectrons(
    electrons: ElectronDifference['updated'],
  ): string {
    return Object.entries(electrons)
      .map(([electronName, electron]) => {
        return `
            ${this.buildUpdatedElectron(electronName, electron)}
            ${this.buildUpdatedConstraint(electronName, electron)}
        `.trim();
      })
      .join('\n');
  }

  private buildUpdatedConstraint(
    electronName: string,
    electron: Partial<MetadataElectron>,
  ): string {
    const clauses: string[] = [];
    if (electron.isRequired === true) {
      clauses.push(`table.dropNullable('${electronName}');`);
    } else if (electron.isRequired === false) {
      clauses.push(`table.setNullable('${electronName}');`);
    }
    if (electron.isUnique === true) {
      clauses.push(`table.unique('${electronName}');`);
    } else if (electron.isUnique === false) {
      clauses.push(`table.dropUnique('${electronName}');`);
    }
    if (electron.isIndexed === true) {
      clauses.push(`table.index('${electronName}');`);
    } else if (electron.isIndexed === false) {
      clauses.push(`table.dropIndex('${electronName}');`);
    }
    return clauses.join('\n');
  }

  private buildUpdatedElectron(
    electronName: string,
    electron: Partial<MetadataElectron>,
  ): string {
    if (electron.fieldType) {
      throw new Error('We do not support change fieldType here.');
    }
    return '';
  }

  private buildDeletedElectrons(
    electrons: ElectronDifference['deleted'],
  ): string {
    return Object.entries(electrons)
      .map(([electronName, electron]) => {
        return electron === undefined
          ? this.buildDeletedElectron(electronName)
          : this.buildDeletedConstraint(electronName, electron);
      })
      .join('\n');
  }

  private buildDeletedConstraint(
    electronName: string,
    electron: Partial<MetadataElectron>,
  ): string {
    const clauses: string[] = [];
    if (electron.isUnique === undefined) {
      clauses.push(`table.dropUnique('${electronName}');`);
    }
    if (electron.isIndexed === undefined) {
      clauses.push(`table.dropIndex('${electronName}');`);
    }
    return clauses.join('\n');
  }

  private buildDeletedElectron(electronName: string): string {
    return `table.dropColumn('${electronName}');`;
  }

  private getDiff(
    current: MigrationElectronMap,
    previous: MigrationElectronMap,
  ): ElectronDifference {
    return detailedDiff(previous, current) as ElectronDifference;
  }

  private buildElectron(electron: MetadataElectron): string {
    const electronBuilder = ElectronBuilderFactory.create(electron);
    return electronBuilder.buildSqlSchema();
  }
}

type ElectronDifference = {
  added: {
    [electronName: string]: Partial<MetadataElectron>;
  };
  updated: {
    [electronName: string]: Partial<MetadataElectron>;
  };
  deleted: {
    [electronName: string]: Partial<MetadataElectron> | undefined;
  };
};
