import {
  MetadataSchema,
  DataSourceSchema,
  DataSourceConnection,
} from '@shukun/schema';
import Knex from 'knex';
import { NodeVM } from 'vm2';

import { Differ } from '../differ/differ';
import { FlatMetadata } from '../flat-metadata/flat-metadata';
import { Generator } from '../generator/generator';

import { IRunner } from './runner.interface';

export class Runner implements IRunner {
  async migrate(
    previousMetadata: MetadataSchema[],
    nextMetadata: MetadataSchema[],
    connections: DataSourceSchema,
  ): Promise<void> {}

  async migrateEachConnection(
    previousMetadata: MetadataSchema[],
    nextMetadata: MetadataSchema[],
    connection: DataSourceConnection,
  ): Promise<void> {
    const differ = new Differ(
      new FlatMetadata().flatten(previousMetadata),
      new FlatMetadata().flatten(nextMetadata),
    );
    const generator = new Generator(differ);
    const code = generator.generate();

    const wrappedCode = `
        ${code}

        async function main(schema, helpers){
            const schemas = createSchemas(schema, helpers);
            await schemas;
        };
        exports.default=main;
    `;

    const vm = new NodeVM();
    const exports = vm.run(wrappedCode);

    const schema = Knex({
      client: 'pg',
      connection: 'postgres://test:test@localhost:25432/test',
    }).schema;

    const helpers = {
      getTableName: (atomName: string) => {
        return atomName;
      },
    };

    await exports.default(schema, helpers);
  }
}
