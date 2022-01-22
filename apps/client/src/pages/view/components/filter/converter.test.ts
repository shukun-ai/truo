import { MetadataFieldType } from '@shukun/schema';

import { BooleanChoose } from '../fields/boolean/BooleanFilter';

import { convertViewColumn } from './converter';

describe('converter.test.ts', () => {
  it('Text', () => {
    const output = convertViewColumn(
      {
        name: 'api',
      },
      'name',
      MetadataFieldType.Text,
    );

    expect(output).toEqual({
      name: { $regex: 'api' },
    });
  });

  it('ManyToMany', () => {
    const output = convertViewColumn(
      {
        users: ['1234567890'],
      },
      'users',
      MetadataFieldType.ManyToMany,
    );

    expect(output).toEqual({
      users: { $in: ['1234567890'] },
    });
  });

  it('Boolean', () => {
    const output = convertViewColumn(
      {
        required: BooleanChoose.No,
      },
      'required',
      MetadataFieldType.Boolean,
    );

    expect(output).toEqual({
      required: false,
    });
  });
});
