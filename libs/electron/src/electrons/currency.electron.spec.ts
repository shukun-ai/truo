import { MetadataElectron, MetadataFieldType } from '@shukun/schema';

import { CurrencyElectron } from './currency.electron';

describe('Currency', () => {
  it('Should show currency fixed precision and scale.', () => {
    const electron: MetadataElectron = {
      name: 'mock',
      label: 'Mock',
      fieldType: MetadataFieldType.Float,
      isRequired: true,
    };

    const field = new CurrencyElectron();
    const output = field.buildSqlSchema(electron);
    expect(output).toEqual(`table.float('mock', 15, 4).notNullable();`);
  });

  it('If the user set custom precision and scale, it will throw error.', () => {
    const electron: MetadataElectron = {
      name: 'mock',
      label: 'Mock',
      fieldType: MetadataFieldType.Float,
      isRequired: true,
      precision: 12,
      scale: 6,
    };

    const field = new CurrencyElectron();
    expect(() => field.buildSqlSchema(electron)).toThrow(
      new Error(
        'Please remove precision and scale, those value is not used for Currency type.',
      ),
    );
  });
});
