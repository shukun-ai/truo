import { generateMigration as baseGenerateMigration } from '@shukun/cli';
import { ApplicationSchema } from '@shukun/schema';
import Knex from 'knex';
import { NodeVM } from 'vm2';

export const generateMigration = async (lowCode: ApplicationSchema) => {
  const code = await baseGenerateMigration({ application: lowCode });

  const wrappedCode = `
        ${code}

        async function main(knex, helpers){
            const schemas = createSchemas(knex, helpers);
            await schemas;
        };
        exports.default=main;
    `;

  const vm = new NodeVM();
  const exports = vm.run(wrappedCode);

  const knex = Knex({
    client: 'pg',
    connection: 'postgres://test:test@localhost:25432/test',
  });

  const helpers = {
    getTableName: (atomName: string) => {
      return atomName;
    },
  };

  await exports.default(knex, helpers);
};
