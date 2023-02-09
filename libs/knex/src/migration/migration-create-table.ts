import {
  MetadataElectron,
  MigrationElectronMap,
  MigrationMetadataMap,
} from '@shukun/schema';

import { ElectronBuilderFactory } from '../electrons/electron-builder.factory';

export class MigrationCreateTable {
  public build(atoms: MigrationMetadataMap): string {
    return Object.entries(atoms)
      .map(([atomName, electrons]) =>
        `
            schema.createTable(helpers.getTableName('${atomName}'), (table) => {
                ${this.buildInternalElectrons()}
                ${this.buildElectrons(electrons)}
            });
        `.trim(),
      )
      .join('\n');
  }

  private buildInternalElectrons() {
    return `
        table.string('_id', 255).primary();
        table.string('owner', 255).nullable();
        table.timestamp('createdAt').nullable();
        table.timestamp('updatedAt').nullable();
    `.trim();
  }

  private buildElectrons(electrons: MigrationElectronMap): string {
    return Object.values(electrons)
      .map(this.buildConstraintElectron.bind(this))
      .join('\n');
  }

  private buildConstraintElectron(electron: MetadataElectron): string {
    let clause = 'table';

    clause += this.buildElectron(electron);

    if (electron.isRequired === true) {
      clause += '.notNullable()';
    } else if (electron.isRequired === false) {
      clause += '.nullable()';
    }

    if (electron.isUnique === true) {
      clause += '.unique()';
    }

    if (electron.isIndexed === true) {
      clause += '.index()';
    }

    clause += ';';

    return clause;
  }

  private buildElectron(electron: MetadataElectron): string {
    const electronBuilder = ElectronBuilderFactory.create(electron);
    return electronBuilder.buildSqlSchema();
  }
}
