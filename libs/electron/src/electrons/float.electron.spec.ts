import { MetadataElectron, MetadataFieldType } from '@shukun/schema';

import { FloatElectron } from './float.electron';

describe('float', () => {
  it('Should show default precision and scale.', () => {
    const electron: MetadataElectron = {
      name: 'mock',
      label: 'Mock',
      fieldType: MetadataFieldType.Float,
      isRequired: true,
    };

    const field = new FloatElectron();
    const output = field.buildSqlSchema(electron);
    expect(output).toEqual(`.float('mock', 8, 2)`);
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
    expect(output).toEqual(`.float('mock', 12, 6)`);
  });
});
