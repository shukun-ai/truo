import { MetadataElectron } from '@shukun/schema';

import { FloatElectron } from './float.electron';

describe('float', () => {
  it('Should show default precision and scale.', () => {
    const electron: MetadataElectron = {
      name: 'mock',
      label: 'Mock',
      fieldType: 'Float',
      isRequired: true,
    };

    const field = new FloatElectron(electron);
    const output = field.buildSqlSchema();
    expect(output).toEqual(`.decimal('mock', null, null)`);
  });

  it('custom precision, scale', () => {
    const electron: MetadataElectron = {
      name: 'mock',
      label: 'Mock',
      fieldType: 'Float',
      isRequired: false,
      precision: 12,
      scale: 6,
    };

    const field = new FloatElectron(electron);
    const output = field.buildSqlSchema();
    expect(output).toEqual(`.decimal('mock', null, null)`);
  });
});
