import {
  DataSourceConnection,
  MigrationChanges,
  MigrationMetadataMap,
} from '@shukun/schema';

import { MigrationGenerator } from './migration-generator';

describe('Generator', () => {
  const trimCode = (code: string) => {
    return code
      .trim()
      .split('\n')
      .map((item) => item.trim());
  };

  describe('generate', () => {
    const left: MigrationMetadataMap = {
      devices: {
        number: {
          name: 'number',
          label: 'number',
          fieldType: 'Text',
          isRequired: true,
        },
        type: {
          name: 'type',
          label: 'type',
          fieldType: 'Text',
          isRequired: true,
        },
      },
      community: {
        name: {
          name: 'name',
          label: 'name',
          fieldType: 'Text',
          isRequired: true,
        },
      },
    };

    const right: MigrationMetadataMap = {
      airports: {
        code: {
          name: 'code',
          label: 'code',
          fieldType: 'Text',
          isRequired: true,
        },
      },
      devices: {
        number: {
          name: 'number',
          label: 'number',
          fieldType: 'Text',
          isRequired: false,
          isUnique: true,
          isIndexed: true,
        },
        title: {
          name: 'title',
          label: 'title',
          fieldType: 'Text',
          isRequired: false,
        },
      },
    };

    it('should return DB schema builder.', () => {
      const changes: MigrationChanges = {
        difference: {
          added: {
            airports: {
              code: {
                name: 'code',
                label: 'code',
                fieldType: 'Text',
                isRequired: true,
              },
            },
          },
          updated: {
            devices: {
              number: {
                name: 'number',
                label: 'number',
                fieldType: 'Text',
                isRequired: false,
                isUnique: true,
                isIndexed: true,
              },
              title: {
                name: 'title',
                label: 'title',
                fieldType: 'Text',
                isRequired: false,
              },
            },
          },
          deleted: {
            community: {
              name: {
                name: 'name',
                label: 'name',
                fieldType: 'Text',
                isRequired: true,
              },
            },
          },
        },
        previous: left,
        next: right,
      };
      const connection: DataSourceConnection = {
        type: 'postgres',
        host: '',
        database: '',
        metadata: ['devices', 'airports', 'community'],
      };

      const code = new MigrationGenerator(changes, connection).generate();

      /**
       * @remark
       *
       * createTable did not support setNullable or dropNullable.
       */
      expect(trimCode(code)).toEqual(
        trimCode(
          `
          const createSchemas = (schema, helpers) => {
            schema.createTable(helpers.getTableName('airports'), (table) => {
              table.string('_id', 255).primary();
              table.string('owner', 255).nullable();
              table.timestamp('createdAt').nullable();
              table.timestamp('updatedAt').nullable();
              table.string('code', 1000).notNullable();
            });
            schema.alterTable(helpers.getTableName('devices'), (table) => {
              table.unique('number');
              table.index('number');
              table.string('title', 1000);
              table.setNullable('title');
              table.setNullable('number');
              table.dropColumn('type');
            });
            schema.dropTableIfExists(helpers.getTableName('community'));
            return schema;
          };
        `,
        ),
      );
    });

    it('should return DB schema builder.', () => {
      const changes: MigrationChanges = {
        difference: {
          added: {
            community: {
              name: {
                name: 'name',
                label: 'name',
                fieldType: 'Text',
                isRequired: true,
              },
            },
          },
          updated: {
            devices: {
              number: {
                name: 'number',
                label: 'number',
                fieldType: 'Text',
                isRequired: true,
              },
              type: {
                name: 'type',
                label: 'type',
                fieldType: 'Text',
                isRequired: true,
              },
            },
          },
          deleted: {
            airports: {
              code: {
                name: 'code',
                label: 'code',
                fieldType: 'Text',
                isRequired: true,
              },
            },
          },
        },
        previous: right,
        next: left,
      };
      const connection: DataSourceConnection = {
        type: 'postgres',
        host: '',
        database: '',
        metadata: ['devices', 'airports', 'community'],
      };

      const code = new MigrationGenerator(changes, connection).generate();

      /**
       * @remark
       *
       * createTable did not support setNullable or dropNullable.
       */
      expect(trimCode(code)).toEqual(
        trimCode(
          `
          const createSchemas = (schema, helpers) => {
            schema.createTable(helpers.getTableName('community'), (table) => {
              table.string('_id', 255).primary();
              table.string('owner', 255).nullable();
              table.timestamp('createdAt').nullable();
              table.timestamp('updatedAt').nullable();
              table.string('name', 1000).notNullable();
            });
            schema.alterTable(helpers.getTableName('devices'), (table) => {
              table.string('type', 1000);
              table.dropNullable('type');
              table.dropNullable('number');
              table.dropUnique('number');
              table.dropIndex('number');
              table.dropColumn('title');
            });
            schema.dropTableIfExists(helpers.getTableName('airports'));
            return schema;
          };
        `,
        ),
      );
    });
  });
});
