import { Differ } from '../differ/differ';
import { FlatMetadataSchema } from '../flat-metadata/flat-metadata.type';

import { Generator } from './generator';

describe('Generator', () => {
  describe('generate', () => {
    it('should return DB schema builder.', () => {
      const left: FlatMetadataSchema = {
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
      };
      const right: FlatMetadataSchema = {
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
      };

      const differ = new Differ(left, right);
      const code = new Generator(differ).generate();

      expect(code.split('\n').map((item) => item.trim())).toEqual(
        `
        schema.createTable(helpers.getTableName('devices'), (table) => {
          table.string('number', 1000);
          table.string('title', 1000);
          table.setNullable('title');
        });

        schema.alterTable(helpers.getTableName('airports'), (table) => {
          table.dropNullable('code');
        });

        schema.dropTableIfExists(helpers.getTableName('vehicles'));
        `
          .split('\n')
          .map((item) => item.trim()),
      );
    });
  });
});
