import {
  IMigrationExecutor,
  MigrationChanges,
  MigrationExecutorContext,
} from '@shukun/schema';
import { DataSourceConnection } from '@shukun/schema';
import { Knex } from 'knex';
import { NodeVM } from 'vm2';

import { ConnectionBuilder } from './connection/connection-builder';
import { buildTableName } from './helper/build-table-name';

import { MigrationGenerator } from './migration/migration-generator';

export class MigrationExecutor implements IMigrationExecutor {
  async run(
    changes: MigrationChanges,
    context: MigrationExecutorContext,
  ): Promise<void> {
    const client = await this.createClient(context.connection);
    const code = this.generateCode(changes, context);

    await this.executeVM(client, code, context);
    await client.destroy();
  }

  private generateCode(
    changes: MigrationChanges,
    context: MigrationExecutorContext,
  ) {
    const migrationGenerator = new MigrationGenerator(
      changes,
      context.connection,
    );
    return this.wrapCode(migrationGenerator.generate());
  }

  private wrapCode(code: string) {
    return `
      ${code}

      async function main(schema, helpers){
          const schemas = createSchemas(schema, helpers);
          await schemas;
      };
      exports.default=main;
    `;
  }

  private async createClient(connection: DataSourceConnection) {
    const builder = new ConnectionBuilder();
    return await builder.createClient(connection);
  }

  private async executeVM(
    client: Knex,
    code: string,
    context: MigrationExecutorContext,
  ) {
    const vm = new NodeVM();
    const exports = vm.run(code);

    const helpers = {
      getTableName: (atomName: string) => {
        return buildTableName(context.orgName, atomName, context.connection);
      },
    };

    await exports.default(client.schema, helpers);
  }
}
