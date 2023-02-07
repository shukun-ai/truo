import { MetadataElectron } from '@shukun/schema';

import { CurrencyElectron } from './currency.electron';

describe('Currency', () => {
  it('Should show currency fixed precision and scale.', () => {
    const electron: MetadataElectron = {
      name: 'mock',
      label: 'Mock',
      fieldType: 'Currency',
      isRequired: true,
    };

    const field = new CurrencyElectron(electron);
    const output = field.buildSqlSchema();
    expect(output).toEqual(`.decimal('mock', null, null)`);
  });

  it('If the user set custom precision and scale, it will throw error.', () => {
    const electron: MetadataElectron = {
      name: 'mock',
      label: 'Mock',
      fieldType: 'Currency',
      isRequired: true,
      precision: 12,
      scale: 6,
    };

    const field = new CurrencyElectron(electron);
    const output = field.buildSqlSchema();
    expect(output).toEqual(`.decimal('mock', null, null)`);
  });
});
