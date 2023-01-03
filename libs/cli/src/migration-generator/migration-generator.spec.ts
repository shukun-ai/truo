import { ApplicationSchema, MetadataFieldType } from '@shukun/schema';

import { generateMigration } from './migration-generator';

describe('generateMigration', () => {
  it('generateMigration', async () => {
    const application: ApplicationSchema = {
      title: 'test',
      metadata: [
        {
          name: 'devices',
          label: 'Devices',
          source: 'postgres://localhost/mock_db',
          electrons: [
            {
              name: 'number',
              label: 'Device ID',
              fieldType: MetadataFieldType.Text,
              isRequired: true,
              isUnique: true,
            },
            {
              name: 'title',
              label: 'Device Label',
              fieldType: MetadataFieldType.Text,
              isRequired: true,
            },
            {
              name: 'type',
              label: 'Type',
              fieldType: MetadataFieldType.SingleSelect,
              isRequired: true,
              options: [
                {
                  key: 'vehicle',
                  label: 'Vehicle Based',
                },
                {
                  key: 'delivery',
                  label: 'Delivery PDA',
                },
                {
                  key: 'ticket',
                  label: 'Ticket PDA',
                },
              ],
            },
          ],
        },
      ],
    };

    const output = `/* eslint-disable */
/* tslint:disable */
/**
 * This file was automatically generated by SHUKUN json-schema.
 */
export const runMigration = (knex) => {
    knex.schema.createTable('devices', (table) => {
        table.string('_id', 255);
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
        table.string('number', 1000);
        table.string('title', 1000);
        table.string('type', 1000);
        table.primary('_id');
    });
};
`;

    const migration = await generateMigration({
      application,
      style: {
        singleQuote: true,
        trailingComma: 'all',
        tabWidth: 4,
      },
    });

    expect(migration).toEqual(output);
  });
});
