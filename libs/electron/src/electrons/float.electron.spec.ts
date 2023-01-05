import { MetadataElectron, MetadataFieldType } from '@shukun/schema';

import { FloatElectron } from './float.electron';

describe('float', () => {
  it('Should show notNullable, default precision and scale.', () => {
    const electron: MetadataElectron = {
      name: 'mock',
      label: 'Mock',
      fieldType: MetadataFieldType.Float,
      isRequired: true,
    };

    const field = new FloatElectron();
    const output = field.buildSqlSchema(electron);
    expect(output).toEqual(`table.float('mock', 8, 2).notNullable();`);
  });

  it('Should nullable when isRequired is false.', () => {
    const electron: MetadataElectron = {
      name: 'mock',
      label: 'Mock',
      fieldType: MetadataFieldType.Float,
      isRequired: false,
    };

    const field = new FloatElectron();
    const output = field.buildSqlSchema(electron);
    expect(output).toEqual(`table.float('mock', 8, 2).nullable();`);
  });

  it('custom precision, scale', () => {
    const electron: MetadataElectron = {
      name: 'mock',
      label: 'Mock',
      fieldType: MetadataFieldType.Float,
      isRequired: false,
      precision: 12,
      scale: 6,
    };

    const field = new FloatElectron();
    const output = field.buildSqlSchema(electron);
    expect(output).toEqual(`table.float('mock', 12, 6).nullable();`);
  });
});
