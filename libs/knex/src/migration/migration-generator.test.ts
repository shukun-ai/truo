import { DataSourceConnection, MigrationChanges } from '@shukun/schema';

import { MigrationGenerator } from './migration-generator';

describe('Generator', () => {
  const trimCode = (code: string) => {
    return code
      .trim()
      .split('\n')
      .map((item) => item.trim());
  };

  describe('generate', () => {
    it('should return DB schema builder.', () => {
      const changes: MigrationChanges = {
        difference: {
          added: {
            devices: {
              number: {
                name: 'number',
                label: 'number',
                fieldType: 'Text',
                isRequired: true,
              },
              title: {
                name: 'title',
                label: 'title',
                fieldType: 'Text',
                isRequired: false,
              },
            },
          },
          updated: {
            airports: {
              code: {
                isRequired: true,
              },
            },
          },
          deleted: {
            vehicles: {
              number: {
                name: 'number',
                label: 'number',
                fieldType: 'Text',
                isRequired: true,
              },
            },
          },
        },
        previous: {
          airports: {
            code: {
              name: 'code',
              label: 'code',
              fieldType: 'Text',
              isRequired: false,
            },
          },
          vehicles: {
            number: {
              name: 'number',
              label: 'number',
              fieldType: 'Text',
              isRequired: true,
            },
          },
        },
        next: {
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
              isRequired: true,
            },
            title: {
              name: 'title',
              label: 'title',
              fieldType: 'Text',
              isRequired: false,
            },
          },
        },
      };
      const connection: DataSourceConnection = {
        type: 'postgres',
        host: '',
        database: '',
        metadata: ['devices', 'airports', 'vehicles'],
      };

      const code = new MigrationGenerator(changes, connection).generate();

      expect(trimCode(code)).toEqual(
        trimCode(
          `
          const createSchemas = (schema, helpers) => {
            schema.createTable(helpers.getTableName('devices'), (table) => {
              table.string('_id', 255).unique().notNullable();
              table.primary('_id');
              table.string('owner', 255);
              table.timestamp('createdAt').nullable();
              table.timestamp('updatedAt').nullable();
              table.string('number', 1000);
              table.string('title', 1000);
              table.setNullable('title');
            });

            schema.alterTable(helpers.getTableName('airports'), (table) => {
              table.dropNullable('code');
            });

            schema.dropTableIfExists(helpers.getTableName('vehicles'));

            return schema;
          };
        `,
        ),
      );
    });
  });
});
